import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web

import textwrap

from tornado.options import define, options
define("port", default=8000, help="run on the given port", type=int)

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        greeting = self.get_argument('greeting', 'Hello')
        self.write(greeting + ', friendly user!')



class ReverseHandler(tornado.web.RequestHandler):
    def get(self, input):
        self.write(input[::-1])

class WrapHandler(tornado.web.RequestHandler):
    def post(self):
        text = self.get_argument('text')
        print(text)
        width = self.get_argument('width', 40)
        self.write(textwrap.fill(text, int(width)))
    def write_error(self, status_code, **kwargs):
        self.write("Gosh darnit, user! You caused a %d error." % status_code)

if __name__ == "__main__":

    setting = {
        'debug':True,# 自动更新重启
        # 'static_path' : os.path.join(os.path.dirname(__file),"static"),
        # 'template_path' : os.path.join(os.path.dirname(__file__),"templates"),
    }
    tornado.options.parse_command_line()
    app = tornado.web.Application(handlers=[
        (r"/", IndexHandler),
        (r"/reverse/(\w+)", ReverseHandler),
        (r"/wrap", WrapHandler)
    ]
    )
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()