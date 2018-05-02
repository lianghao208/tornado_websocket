/**
 * Created by Administrator on 2017/12/14.
 */

var arrThroughputSum = [0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0];
var arrThroughput = [0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0];

$(document).ready(function () {

    var myChart

    // 路径配置
    require.config({
        paths: {
            echarts: '../static/dist'
        }
    });

// 使用
    require(
        [
            'echarts',
            //'echarts/chart/bar', // 使用柱状图就加载bar模块，按需加载
            'echarts/chart/line'
        ],
        function (ec) {
            // 基于准备好的dom，初始化echarts图表
            myChart = ec.init(document.getElementById('main'));

            var option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['吞吐量', '总吞吐量']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['0','5', '10','15', '20','25', '30','35', '40','45', '50','55', '60']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '吞吐量',
                        type: 'line',
                        stack: '总量',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0]
                    },
                    {
                        name: '总吞吐量',
                        type: 'line',
                        stack: '总量',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0]
                    }
                ]
            };

            // 为echarts对象加载数据
            myChart.setOption(option);
        }
    );

    document.session = $('#session').val();

    //更新数据
    function refreshData(dataThroughput,dataThroughputSum) {
        if (!myChart) {
            return;
        }

        //更新数据
        var option = myChart.getOption();
        option.series[0].data = dataThroughput;
        option.series[1].data = dataThroughputSum;
        myChart.setOption(option);
    }

    //每隔5000毫秒刷新一次数据
    window.setInterval(function () {
        var throughputSumArr = arrThroughputSum;
        var throughputArr = arrThroughput;

        throughputSumArr.unshift(arrThroughputSum[0]);
        throughputArr.unshift(arrThroughput[0]);

        throughputSumArr.slice(0,13);
        throughputArr.slice(0,13);
        refreshData(throughputArr,throughputSumArr);
    }, 5000);


    //每次新用户打开一个新窗口都会调用这个WebScoket方法
    setTimeout(requestInventory, 100);

    //点击显示数据之后触发这个回调函数
    $('#show-data').click(function (event) {
        jQuery.ajax({
            url: '//localhost:8000/cart',
            type: 'POST',
            data: {
                session: document.session,
                action: 'show',
                layer: 'mac',
                dataSize: 560,
                throughput: 1000,
                dataSizeSum: 1120,
                throughputSum: 1000,
                delay: 1.2,
                delaySum: 2.4,
                delayAvg: 1.2,
                lossRate: 0.8,
                sendDataNum:0,
                recvDataNum:0
            },
            dataType: 'json',
            beforeSend: function (xhr, settings) {
                //$(event.target).attr('disabled', 'disabled');
            },
            success: function (data, status, xhr) {
                $(event.target).removeAttr('disabled');
            }
        });
    });

});

//每次用户打开新界面都会触发这个方法!!!
function requestInventory() {
    var host = 'ws://localhost:8000/cart/status';

    var websocket = new WebSocket(host);

    websocket.onopen = function (evt) {
    };
    websocket.onmessage = function (evt) {
        $('#layer').html($.parseJSON(evt.data)['layer']);
        $('#dataSize').html($.parseJSON(evt.data)['dataSize']);
        $('#throughput').html($.parseJSON(evt.data)['throughput']);
        $('#dataSizeSum').html($.parseJSON(evt.data)['dataSizeSum']);
        $('#throughputSum').html($.parseJSON(evt.data)['throughputSum']);
        $('#delay').html($.parseJSON(evt.data)['delay']);
        $('#delaySum').html($.parseJSON(evt.data)['delaySum']);
        $('#delayAvg').html($.parseJSON(evt.data)['delayAvg']);
        $('#lossRate').html($.parseJSON(evt.data)['lossRate']);
        $('#sendDataNum').html($.parseJSON(evt.data)['sendDataNum']);
        $('#recvDataNum').html($.parseJSON(evt.data)['recvDataNum']);

        if ($.parseJSON(evt.data)['throughputSum'] != null){
            arrThroughputSum.unshift(parseInt($.parseJSON(evt.data)['throughputSum']));
            console.log(arrThroughputSum);
        }
        if ($.parseJSON(evt.data)['throughput'] != null){
            arrThroughput.unshift(parseInt($.parseJSON(evt.data)['throughput']));
            console.log(arrThroughput);
        }

        //$('#layer').html()
    };
    websocket.onerror = function (evt) {
    };
}