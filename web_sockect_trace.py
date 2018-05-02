import tornado.web
import tornado.websocket
import tornado.httpserver
import tornado.ioloop
import tornado.options
import time
from uuid import uuid4
# 数字1、2、3、4 依次说明了点击add to cart添加购物车按钮后服务器发生的事情

class TraceData(object):
    totalInventory = 10
    callbacks = []
    carts = {}

    def register(self, callback):
        self.callbacks.append(callback)

    def unregister(self, callback):
        self.callbacks.remove(callback)

    def moveItemToCart(self,
                       session,
                       layer,
                       dataSize,
                       throughput,
                       dataSizeSum,
                       throughputSum,
                       delay,
                       delaySum,
                       delayAvg,
                       lossRate,
                       sendDataNum,
                       recvDataNum
                       ):
        #if session in self.carts:
         #   return

        self.carts[session] = True
        self.notifyCallbacks(layer,
                            dataSize,
                            throughput,
                            dataSizeSum,
                            throughputSum,
                            delay,
                            delaySum,
                            delayAvg,
                            lossRate,
                            sendDataNum,
                            recvDataNum
                             )  # 2.调用该方法，说明有其中一个会话在减库存，需要告诉其它会话已经更新库存

    def removeItemFromCart(self, session):
        if session not in self.carts:
            return

        del (self.carts[session])
        self.notifyCallbacks()

    def notifyCallbacks(self,
                        layer,
                        dataSize,
                        throughput,
                        dataSizeSum,
                        throughputSum,
                        delay,
                        delaySum,
                        delayAvg,
                        lossRate,
                        sendDataNum,
                        recvDataNum
                        ):
        for callback in self.callbacks:
            # callback(self.getInventoryCount())  # 3.调用该方法，从list中将每个会话的回调取出，依次发送最新的库存数
            callback(layer,
                    dataSize,
                    throughput,
                    dataSizeSum,
                    throughputSum,
                    delay,
                    delaySum,
                    delayAvg,
                    lossRate,
                    sendDataNum,
                    recvDataNum
                    );




# 显示首页
class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        session = uuid4()
        layer = '*'
        dataSize= 0
        throughput= 0
        dataSizeSum= 0
        throughputSum= 0
        delay= 0.0
        delaySum= 0.0
        delayAvg= 0.0
        lossRate= 0.0
        sendDataNum=0
        recvDataNum=0
        self.render("index2.html",
                    session=session,
                    layer=layer,
                    dataSize=dataSize,
                    throughput = throughput,
                    dataSizeSum = dataSizeSum,
                    throughputSum = throughputSum,
                    delay = delay,
                    delaySum = delaySum,
                    delayAvg = delayAvg,
                    lossRate = lossRate,
                    sendDataNum = sendDataNum,
                    recvDataNum = recvDataNum
                    )


# 点击添加到购物车之后发送AJAX请求到这个类
class CartHandler(tornado.web.RequestHandler):
    def post(self):
        action = self.get_argument('action')
        session = self.get_argument('session')
        layer = self.get_argument('layer')
        dataSize = self.get_argument('dataSize')
        throughput = self.get_argument('throughput')
        dataSizeSum = self.get_argument('dataSizeSum')
        throughputSum = self.get_argument('throughputSum')
        delay = self.get_argument('delay')
        delaySum = self.get_argument('delaySum')
        delayAvg = self.get_argument('delayAvg')
        lossRate = self.get_argument('lossRate')
        sendDataNum = self.get_argument('sendDataNum')
        recvDataNum = self.get_argument('recvDataNum')

        if not session:
            self.set_status(400)
            return

        if action == 'show':
            self.application.traceData.moveItemToCart(session,
                                                      layer,
                                                      dataSize,
                                                      throughput,
                                                      dataSizeSum,
                                                      throughputSum,
                                                      delay,
                                                      delaySum,
                                                      delayAvg,
                                                      lossRate,
                                                      sendDataNum,
                                                      recvDataNum
                                                      ) # 1.调用该方法将会话Session传递
        elif action == 'remove':
            self.application.traceData.removeItemFromCart(session)
        else:
            self.set_status(400)

# 每次新用户打开新窗口都会访问这个类的open方法，on_message方法负责接收客户端信息
class StatusHandler(tornado.websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        self.application.traceData.register(self.callback) # 将新窗口注册到callback的list中

    def on_close(self):
        self.application.traceData.unregister(self.callback) # socket会话结束后关闭socket将list中的callback注销

    def on_message(self, message):
        pass

    # 4.服务器主动向客户端发送信息（不需要保持连接）
    def callback(self,
                 layer,
                 dataSize,
                 throughput,
                 dataSizeSum,
                 throughputSum,
                 delay,
                 delaySum,
                 delayAvg,
                 lossRate,
                 sendDataNum,
                 recvDataNum
                 ):
        self.write_message('{"layer":"%s"}' % layer)
        self.write_message('{"dataSize":"%s"}' % dataSize) # 将message数据传递回客户端窗口
        self.write_message('{"throughput":"%s"}' % throughput) # 将message数据传递回客户端窗口
        self.write_message('{"dataSizeSum":"%s"}' % dataSizeSum) # 将message数据传递回客户端窗口
        self.write_message('{"throughputSum":"%s"}' % throughputSum) # 将message数据传递回客户端窗口
        self.write_message('{"delay":"%s"}' % delay) # 将message数据传递回客户端窗口
        self.write_message('{"delaySum":"%s"}' % delaySum) # 将message数据传递回客户端窗口
        self.write_message('{"delayAvg":"%s"}' % delayAvg) # 将message数据传递回客户端窗口
        self.write_message('{"lossRate":"%s"}' % lossRate) # 将message数据传递回客户端窗口
        self.write_message('{"sendDataNum":"%s"}' % sendDataNum) # 将message数据传递回客户端窗口
        self.write_message('{"recvDataNum":"%s"}' % recvDataNum) # 将message数据传递回客户端窗口


class ChartHandler(tornado.web.RequestHandler):
    def get(self):
        self.render("chart.html")

class Application(tornado.web.Application):
    def __init__(self):
        self.traceData = TraceData()

        handlers = [
            (r'/', IndexHandler),
            (r'/cart', CartHandler),
            (r'/cart/status', StatusHandler),
            (r'/chart', ChartHandler)
        ]

        settings = {
            'template_path': 'templates',
            'static_path': 'static'
        }

        tornado.web.Application.__init__(self, handlers, **settings)


if __name__ == '__main__':
    tornado.options.parse_command_line()

    app = Application()
    server = tornado.httpserver.HTTPServer(app)
    server.listen(8000)
    tornado.ioloop.IOLoop.instance().start()