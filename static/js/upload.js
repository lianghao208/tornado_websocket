//select-省份与城市关联

var coldHotSel = " ";
var sweatSel = " ";
var painSel = " ";
var appetiteSel = " ";
var pee = " ";
var defecate = " ";
var lady = " ";
var thirsty = " ";
var energy = " ";
var sleep = " ";
var pulse = " ";
var others = " ";

//发送请求得到结果
function getResult() {

    //$("#searchResult").text("");
    //清空表
    $("#resultTableId  tr:not(:first)").html("");

    var request = new XMLHttpRequest();
    var cold_hot_sel = $("#cold_hot_1").val();
    var sweat_sel = $("#sweat_1").val();
    var pain_sel = $("#pain_1").val();
    var appetite_sel = $("#appetite_1").val();
    if (cold_hot_sel ==null) cold_hot_sel=" ";
    if (sweat_sel ==null) sweat_sel=" ";
    if (pain_sel ==null) pain_sel=" ";
    if (appetite_sel ==null) appetite_sel=" ";
    if(cold_hot_sel == " " &&
        sweat_sel==" " &&
        pain_sel==" " &&
        appetite_sel==" "
    ){
        return getResultFromText();//选项框为空，则数据为用户输入的字符串
    }
    request.open("GET", "/search/getResult" +
        "/" + cold_hot_sel +
        "/" + sweat_sel +
        "/" + pain_sel +
        "/" + appetite_sel +
        "/%20/%20/%20/%20/%20/%20/%20/%20/%20");
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var responseObj = request.response;//得到json数组字符串
                var jsObj = JSON.parse(responseObj);//转换成json数组对象
                var resultString = "";//结果集
                for (var i=0,len = jsObj.length;i<len;i++){

                    insertRowToTable(jsObj[i]);//每个数据项创建一个块
                    /*resultString += jsObj[i].id +
                        " " + jsObj[i].coldHot +
                        " " + jsObj[i].sweat +
                        " " + jsObj[i].pain +
                        " " + jsObj[i].appetite +
                        " " + jsObj[i].pee +
                        " " + jsObj[i].defecate +
                        " " + jsObj[i].ingredients +
                        " " + jsObj[i].result + "\n\n";
                    $("#searchResult").text(resultString);*/
                }
                return jsObj;
            } else {
                alert("error");
            }

        }
    }
    return null;
}

function getResultFromText() {
    //清空表
    $("#resultTableId  tr:not(:first)").html("");
    var request = new XMLHttpRequest();
    var cold_hot_text = $("#search_cold_hot_text_id").val();
    var sweat_text = $("#search_sweat_text_id").val();
    var pain_text = $("#search_pain_text_id").val();
    var appetite_text = $("#search_appetite_id").val();
    if (cold_hot_text =="") cold_hot_text=" ";
    if (sweat_text =="") sweat_text=" ";
    if (pain_text =="") pain_text=" ";
    if (appetite_text =="") appetite_text=" ";

    request.open("GET", "/search/getResult" +
        "/" + cold_hot_text +
        "/" + sweat_text +
        "/" + pain_text +
        "/" + appetite_text +
        "/%20/%20/%20/%20/%20/%20/%20/%20/%20");
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var responseObj = request.response;//得到json数组字符串
                var jsObj = JSON.parse(responseObj);//转换成json数组对象
                var resultString = "";//结果集
                for (var i=0,len = jsObj.length;i<len;i++){
                    insertRowToTable(jsObj[i]);//每个数据项创建一个块
                    /*resultString += jsObj[i].id +
                     " " + jsObj[i].coldHot +
                     " " + jsObj[i].sweat +
                     " " + jsObj[i].pain +
                     " " + jsObj[i].appetite +
                     " " + jsObj[i].pee +
                     " " + jsObj[i].defecate +
                     " " + jsObj[i].ingredients +
                     " " + jsObj[i].result + "\n\n";
                     $("#searchResult").text(resultString);*/
                }
                return jsObj;

            } else {
                alert("error");
            }

        }
    }
    return null;
}

/**
 * 添加药方
 */
function addMed() {
    var request = new XMLHttpRequest();
    request.open("POST", "/search/addMed",true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //TODO 补全代码
    if(document.getElementById("cold_hot_add").value == "" &&
        document.getElementById("sweat_add").value == "" &&
        document.getElementById("pain_add").value == "" &&
        document.getElementById("appetite_add").value == "" &&
        document.getElementById("pee_add").value == "" &&
        document.getElementById("defecate_add").value == "" &&
        document.getElementById("appearance_add").value == "" &&
        document.getElementById("lady_add").value == "" &&
        document.getElementById("thirsty_add").value == "" &&
        document.getElementById("energy_add").value == "" &&
        document.getElementById("sleep_add").value == "" &&
        document.getElementById("pulse_add").value == "" &&
        document.getElementById("others_add").value == "" &&
        document.getElementById("med_name_add").value == "" &&
        document.getElementById("ingredients_add").value == "" &&
        document.getElementById("result_add").value == ""
    ){
        addMedFromText();//选项框为空，则数据为用户输入的字符串
        alert("ok");
        return;
    }
    request.send("cold_hot="+document.getElementById("cold_hot_add").value + "&" +
        "sweat="+document.getElementById("sweat_add").value + "&" +
        "pain="+document.getElementById("pain_add").value + "&" +
        "appetite="+document.getElementById("appetite_add").value + "&" +
        "pee=" + document.getElementById("pee_add").value + "&" +
        "defecate=" + document.getElementById("defecate_add").value + "&" +
        "appearance=" +document.getElementById("appearance_add").value + "&" +
        "lady=" + document.getElementById("lady_add").value + "&" +
        "thirsty=" +document.getElementById("thirsty_add").value + "&" +
        "energy=" +document.getElementById("energy_add").value + "&" +
        "sleep=" +document.getElementById("sleep_add").value + "&" +
        "pulse=" +document.getElementById("pulse_add").value + "&" +
        "others=" +document.getElementById("others_add").value + "&" +
        "med_name=" +document.getElementById("med_name_add").value + "&" +
        "ingredients=" +document.getElementById("ingredients_add").value + "&" +
        "result="+document.getElementById("result_add").value
    );
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                alert("添加药方成功！");
            }
        } else {
                //alert("添加药方失败！");
        }

    }
}

/**
 * 添加药方
 */
function addMedFromText() {
    var request = new XMLHttpRequest();
    request.open("POST", "/search/addMed",true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //TODO 补全代码
    request.send("cold_hot="+document.getElementById("add_cold_hot_text_id").value + "&" +
        "sweat="+document.getElementById("add_sweat_text_id").value + "&" +
        "pain="+document.getElementById("add_pain_text_id").value + "&" +
        "appetite="+document.getElementById("add_appetite_id").value + "&" +
        "pee=" + "&" +
        "defecate=" + "&" +
        "appearance=" + "&" +
        "lady=" + "&" +
        "thirsty=" + "&" +
        "energy=" + "&" +
        "sleep=" + "&" +
        "pulse=" + "&" +
        "others=" + "&" +
        "med_name=" + "&" +
        "ingredients=" + "&" +
        "result="
    );
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                alert("添加药方成功！");
            }
        } else {
            //alert("添加药方失败！");
        }

    }
}

/**
 * 自动增加行
 * @param jsonObj
 */
function insertRowToTable(jsonObj) {
    var tb = document.getElementById("resultTableId");
    var tr = tb.insertRow(tb.rows.length);
    tr.style.background = "white";
    //tr.style.borderStyle = "1px double #1a237e";
    //tr.style.fontSize = "20px";
    var tdId = tr.insertCell();
    var tdColdHot = tr.insertCell();
    var tdSweat = tr.insertCell();
    var tdPain = tr.insertCell();
    var tdMedName = tr.insertCell();
    var tdIngredients = tr.insertCell();
    var tdResult = tr.insertCell();
    var tdDelete = tr.insertCell();
    tdId.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdColdHot.setAttribute("style","border: 1px double #1a237e;font-size: 20px;width: auto");
    tdSweat.setAttribute("style","border: 1px double #1a237e;font-size: 20px;width: auto");
    tdPain.setAttribute("style","border: 1px double #1a237e;font-size: 20px;width: auto");
    tdMedName.setAttribute("style","border: 1px double #1a237e;font-size: 20px;width: auto");
    tdIngredients.setAttribute("style","border: 1px double #1a237e;font-size: 20px;width: auto");
    tdResult.setAttribute("style","border: 1px double #1a237e;font-size: 20px;width: auto");
    tdDelete.setAttribute("style","border: 1px double #1a237e;font-size: 20px;width: auto");

    tdId.innerHTML=jsonObj.id;
    tdColdHot.innerHTML=jsonObj.coldHot;
    tdSweat.innerHTML=jsonObj.sweat;
    tdPain.innerHTML=jsonObj.pain;
    tdMedName.innerHTML=jsonObj.medName;
    tdIngredients.innerHTML=jsonObj.ingredients;
    tdResult.innerHTML=jsonObj.result;
    tdDelete.innerHTML="<input id = "+ jsonObj.id + "update"+" name="+jsonObj.id+" value='修改' type='button' onclick='updateMed(name)'/>" +
        "<br>"+
        "<br>"+
        "<input id = "+ jsonObj.id + "delete" + " name="+jsonObj.id+" value='删除' type='button' onclick='deleteMed(name) '/>";
}

function updateMed(id) {
    window.open("/update_med.html?id="+id,"_blank");
}

/**
 * 删除药方
 */
function deleteMed(id) {
    if (confirm("是否确认删除该药方？") == true){
        var request = new XMLHttpRequest();
        request.open("POST", "/search/deleteMed",true);
        request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        request.send("id="+id);
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    alert("删除药方成功！");
                    getResult();
                }
            } else {
                alert("删除药方失败！");
            }
        }
    }

}



/*
function createDiv(jsonObj,index){
    var frameTr = document.createElement("tr");
    var frameThId = document.createEventObject("th");
    var frameThColdHot = document.createEventObject("th");
    var frameThSweat = document.createEventObject("th");
    var frameThPain = document.createEventObject("th");
    var frameThIngredients = document.createEventObject("th");
    var frameThResult = document.createEventObject("th");

    //TODO
    frameTr.innerText = jsonObj.id +
        " " + jsonObj.type +
        " " + jsonObj.coldHot +
        " " + jsonObj.sweat +
        " " + jsonObj.pain;
    var bodyFa = document.getElementById("resultTableId");//通过id号获取frameDiv 的父类（也就是上一级的节点）
    bodyFa .appendChild(frameTr);//把创建的节点frameDiv 添加到父类body 中
}
*/

function getInitialData() {

    var request = new XMLHttpRequest();
    request.open("GET", "/search/getSelect");
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var responseObj = request.response;//得到json数组字符串
                var jsObj = JSON.parse(responseObj);//转换成json数组对象
                //$("#cold_hot_1").append("<option value='abc'>" + "123"+ "</option>");
                for(var i=0;i<jsObj.cold_hot.length;i++){
                    $("#cold_hot_1").append("<option value="+jsObj.cold_hot[i]+">" + jsObj.cold_hot[i]+ "</option>");
                }
                for(var i=0;i<jsObj.sweat.length;i++){
                    $("#sweat_1").append("<option value="+jsObj.sweat[i]+">" + jsObj.sweat[i]+ "</option>");
                }
                for(var i=0;i<jsObj.pain.length;i++){
                    $("#pain_1").append("<option value="+jsObj.pain[i]+">" + jsObj.pain[i]+ "</option>");
                }
                for(var i=0;i<jsObj.appetite.length;i++){
                    $("#appetite_1").append("<option value="+jsObj.appetite[i]+">" + jsObj.appetite[i]+ "</option>");
                }
                //渲染插件
                $("#cold_hot_1").multiselect();
                $("#sweat_1").multiselect();
                $("#pain_1").multiselect();
                $("#appetite_1").multiselect();
                //return jsObj.cold_hot;
                /*for (var i=0,len = jsObj.length;i<len;i++){
                    var coldHotStrings = jsObj[i].coldHot.split("，");
                    console.log(coldHotStrings);
                }*/

            } else {
                alert("error");
            }

        }
    }
}

$(
    function () {
        getInitialData();
    }
);


//提交检测
$(document).ready(function(){

    //动态获取选项列表
    /*var flag = true;
    while (flag){
        if(getInitialData() == true){
            flag == false;
        }
    }*/


    $("#cold_hot_add").multiselect();
    $("#sweat_add").multiselect();
    $("#pain_add").multiselect();
    $("#appetite_add").multiselect();
    $("#pee_add").multiselect();
    $("#defecate_add").multiselect();
    $("#appearance_add").multiselect();
    $("#lady_add").multiselect();
    $("#thirsty_add").multiselect();
    $("#energy_add").multiselect();
    $("#sleep_add").multiselect();
    $("#pulse_add").multiselect();
    $("#others_add").multiselect();
    $("#med_name_add").multiselect();
    $("#ingredients_add").multiselect();
    $("#result_add").multiselect();


});
