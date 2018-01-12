/**
 * Created by Administrator on 2017/11/21.
 */
function getMedTable(id) {

    var request = new XMLHttpRequest();
    request.open("GET", "/search/getMedById?id="+id);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //TODO 补全代码
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                var responseObj = request.response;//得到json数组字符串
                var jsObj = JSON.parse(responseObj);//转换成json数组对象
                insertRowToTable(jsObj[0]);//每个数据项创建一个块
            }
        } else {

        }
    }
}


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
    var tdAppetite = tr.insertCell();
    var tdPee = tr.insertCell();
    var tdDefecate = tr.insertCell();
    var tdAppearance = tr.insertCell();
    var tdLady = tr.insertCell();
    var tdThirsty = tr.insertCell();
    var tdEnergy = tr.insertCell();
    var tdSleep = tr.insertCell();
    var tdPulse = tr.insertCell();
    var tdOthers = tr.insertCell();
    var tdMedName = tr.insertCell();
    var tdIngredients = tr.insertCell();
    var tdResult = tr.insertCell();
    var tdSubmit = tr.insertCell();
    tdId.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdColdHot.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdSweat.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdPain.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdAppetite.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdPee.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdDefecate.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdAppearance.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdLady.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdThirsty.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdEnergy.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdSleep.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdPulse.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdOthers.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdMedName.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdIngredients.setAttribute("style","border: 1px double #1a237e;font-size: 20px;width=1000px");
    tdResult.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");
    tdSubmit.setAttribute("style","border: 1px double #1a237e;font-size: 20px;");

    tdId.innerHTML=jsonObj.id;
    tdColdHot.innerHTML="<input style='font-size: 20px;width: auto' id='cold_hot_id' name='coldHot' type='text' value=" + jsonObj.coldHot + " >";
    tdSweat.innerHTML="<input style='font-size: 20px;width: auto' id='sweat_id' name='sweat' type='text' value=" + jsonObj.sweat + " >";
    tdPain.innerHTML="<input style='font-size: 20px;width: auto' id='pain_id' name='pain' type='text' value=" + jsonObj.pain + " >";
    tdAppetite.innerHTML="<input style='font-size: 20px;width: auto' id='appetite_id' name='appetite' type='text' value=" + jsonObj.appetite + " >";
    tdPee.innerHTML="<input style='font-size: 20px;width: auto' id='pee_id' name='pee' type='text' value=" + jsonObj.pee + " >";
    tdDefecate.innerHTML="<input style='font-size: 20px;width: auto' id='defecate_id' name='defecate' type='text' value=" + jsonObj.defecate + " >";
    tdAppearance.innerHTML="<input style='font-size: 20px;width: auto' id='appearance_id' name='appearance' type='text' value=" + jsonObj.appearance + " >";
    tdLady.innerHTML="<input style='font-size: 20px;width: auto' id='lady_id' name='lady' type='text' value=" + jsonObj.lady + " >";
    tdThirsty.innerHTML="<input style='font-size: 20px;width: auto' id='thirsty_id' name='thirsty' type='text' value=" + jsonObj.thirsty + " >";
    tdEnergy.innerHTML="<input style='font-size: 20px;width: auto' id='energy_id' name='energy' type='text' value=" + jsonObj.energy + " >";
    tdSleep.innerHTML="<input style='font-size: 20px;width: auto' id='sleep_id' name='sleep' type='text' value=" + jsonObj.sleep + " >";
    tdPulse.innerHTML="<input style='font-size: 20px;width: auto' id='pulse_id' name='pulse' type='text' value=" + jsonObj.pulse + " >";
    tdOthers.innerHTML="<input style='font-size: 20px;width: auto' id='others_id' name='others' type='text' value=" + jsonObj.others + " >";
    tdMedName.innerHTML="<input style='font-size: 20px;width: auto' id='med_name_id' name='medName' type='text' value=" + jsonObj.medName + " >";
    tdIngredients.innerHTML="<textarea style='font-size: 20px;width: auto' id='ingredients_id' name='ingredients' >" + jsonObj.ingredients + "</textarea>";
    tdResult.innerHTML="<input style='font-size: 20px;width: auto' id='result_id' name='result' type='text' value=" + jsonObj.result + " >";
    tdSubmit.innerHTML="<input id = "+ jsonObj.id + "update"+" name="+jsonObj.id+" value='提交修改' type='button' onclick='submitUpdate(name)'/>";
}

function submitUpdate(name) {
    var request = new XMLHttpRequest();
    var cold_hot = $("#cold_hot_id").val();
    var sweat = $("#sweat_id").val();
    var pain = $("#pain_id").val();
    var appetite = $("#appetite_id").val();
    var pee = $("#pee_id").val();
    var defecate = $("#defecate_id").val();
    var appearance = $("#appearance_id").val();
    var lady = $("#lady_id").val();
    var thirsty = $("#thirsty_id").val();
    var energy = $("#energy_id").val();
    var sleep = $("#sleep_id").val();
    var pulse = $("#pulse_id").val();
    var others = $("#others_id").val();
    var med_name = $("#med_name_id").val();
    var ingredients = $("#ingredients_id").val();
    var result = $("#result_id").val();
    if (cold_hot ==null) cold_hot=" ";
    if (sweat ==null) sweat=" ";
    if (pain ==null) pain=" ";
    if (appetite ==null) pain=" ";
    if (pee ==null) pain=" ";
    if (defecate ==null) pain=" ";
    if (appearance ==null) pain=" ";
    if (lady ==null) pain=" ";
    if (thirsty ==null) pain=" ";
    if (energy ==null) pain=" ";
    if (sleep ==null) pain=" ";
    if (pulse ==null) pain=" ";
    if (others ==null) pain=" ";
    if (med_name ==null) med_name=" ";
    if (ingredients ==null) ingredients=" ";
    if (result ==null) result=" ";
    if(cold_hot == " " &&
        sweat==" " &&
        pain==" " &&
        appetite==" " &&
        pee==" " &&
        defecate==" " &&
        appearance==" " &&
        lady==" " &&
        thirsty==" " &&
        energy==" " &&
        sleep==" " &&
        pulse==" " &&
        others==" " &&
        med_name==" " &&
        ingredients==" " &&
        result==" "
    ){
        alert("数据不可为空！");//选项框为空，则数据为用户输入的字符串
    }
    request.open("POST", "/search/updateResult");
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send("id="+name + "&" +
        "cold_hot="+document.getElementById("cold_hot_id").value + "&" +
        "sweat="+document.getElementById("sweat_id").value + "&" +
        "pain="+document.getElementById("pain_id").value + "&" +
        "appetite=" +document.getElementById("appetite_id").value + "&" +
        "pee="  + document.getElementById("pee_id").value +"&" +
        "defecate="  + document.getElementById("defecate_id").value +"&" +
        "appearance=" + document.getElementById("appearance_id").value +"&" +
        "lady="  + document.getElementById("lady_id").value +"&" +
        "thirsty=" + document.getElementById("thirsty_id").value +"&" +
        "energy="  + document.getElementById("energy_id").value +"&" +
        "sleep=" + document.getElementById("sleep_id").value +"&" +
        "pulse=" + document.getElementById("pulse_id").value +"&" +
        "others=" + document.getElementById("others_id").value +"&" +
        "med_name=" +document.getElementById("med_name_id").value + "&" +
        "ingredients=" +document.getElementById("ingredients_id").value + "&" +
        "result="+document.getElementById("result_id").value);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                alert("修改药方成功！");
            } else {
                alert("error");
            }

        }
    }
}

function getParam(){
    var query = location.search.substring(1);
    var values= query.split("&");
    //************my***********
    var value = new Array(values.length);
    //************************
    var pos = values[0].indexOf('=');
    var paramname = values[0].substring(0,pos);
    var id = values[0].substring(pos+1);
    console.log(paramname+":"+id);
    getMedTable(id);
}
//getParam();
//提交检测
$(document).ready(function(){
    //alert("ok");
    getParam();

});
