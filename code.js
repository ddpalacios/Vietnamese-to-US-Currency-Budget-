var DayClick = 0
var Saved_Array_Position=0
var From_Json_array = [];
var A_Newly_Added_Row = {};
var From_Daily_record_array = [];
var Recorded_Balances = {};
var added_value = {};
var subtracted_value_USD = {};
var subtracted_value_VND = {};
var display_table=true;
var data_Boolean = true;
var Data_btn = 0;



function BudgetInput(){
   var TextID, TextValue, test="value";
  
   TextID = document.getElementById("Budget");
  TextValue = TextID.elements["desiredBudget"].value;

  if (TextValue == ""){
      alert("Please fill out an appropriate budget AND select your rate");
  }
  else{
   if (DayClick == 0 ){
       alert("Please SELECT your rate to continue...");
   }
   //focus on Daily rate, then add functions for each
 else if (DayClick >= 1){
        
       DailyFunction(TextValue);
       Added_Thousand = parseInt(TextValue) * 1000;
       Recorded_Balances = {"Budget": Added_Thousand+ " Daily"}
       localStorage.setItem("SetDailyBudget", Added_Thousand);
       var RetrieveBudget =  localStorage.getItem("SetDailyBudget")
        document.getElementById("Your_Budget").innerHTML = RetrieveBudget + " Daily";
        document.getElementById("VND_Budget").innerHTML = RetrieveBudget;
        Converted_USD_Total = parseInt(RetrieveBudget) / 23306.60;
      // localStorage.setItem("Converted_to_usd", Converted_USD_Total);
        document.getElementById("USD_Budget").innerHTML = Converted_USD_Total.toFixed(2);

   
    

                   
   }


   
   }


} 
//Records User response
function DailyFunction( DailyBudget ){
       DayClick++;
       console.log(" User chose Daily with budget of "+ DailyBudget + " clicked "+ DayClick);
    
   }


function AddToJsonArray(){
var add_btn =  document.getElementById("ADD_TO_ARRAY");
var submit_day_btn = document.getElementById("saveData");

var From_Displayed_Table = document.getElementById("Display_Table");
var Name_Of_Amount_Or_Date = document.getElementById("Input_Amount_and_Date");

var From_row = From_Displayed_Table.insertRow(0); //insert 1 row

var From_Row_Deletion = From_row.insertCell(0);
var From_save_row = From_row.insertCell(1)
var From_item = From_row.insertCell(2)
var From_VndCell = From_row.insertCell(3); //from row, Add cell at position 0 and 1
var From_UsdCell = From_row.insertCell(4);



var Show_VND_Value = Name_Of_Amount_Or_Date.elements["amount"].value;
var Get_Date_Value = Name_Of_Amount_Or_Date.elements["datetime"].value; 

var Converted_to_USD = parseInt(Show_VND_Value) / 23306.60;
A_Newly_Added_Row = {"VND": Show_VND_Value, "USD": Converted_to_USD.toFixed(2)};



var Display_Recorded_Day = Get_Date_Value;
document.getElementById("curDate").innerHTML = Display_Recorded_Day;


var Remove_button = document.createElement("input");
var Edit_Item = document.createElement("input");

Remove_button.setAttribute("type", "button");
Remove_button.setAttribute("value", "Delete Row");

Edit_Item.setAttribute("type", "text");
Edit_Item.setAttribute("id","item_input");



Save_Row_Button = document.createElement("button");
Save_Row_Button.setAttribute("id", "Save_item");

Save_Row_Button.innerHTML = "Save Row";  //Button Text
From_save_row.appendChild(Save_Row_Button); //display it to body

var Returned_array_Index = From_Json_array.length;





From_VndCell.innerHTML = Show_VND_Value + " VND";
From_UsdCell.innerHTML = Converted_to_USD.toFixed(2) + " USD";
From_item.appendChild(Edit_Item);
From_Row_Deletion.appendChild(Remove_button); 
Remove_button.setAttribute("onclick", "Remove_Row(this)");
Add_USD_Values();
Subtract_Budget_VND();


// remove table
data_Boolean = false;
if (data_Boolean == false){
    display_table = true;
    Remove_Current_Table(display_table,data_Boolean);
}

add_btn.disabled=true;
submit_day_btn.disabled=true;

//Save ROW Button
document.getElementById("Save_item").onclick = function(){
document.getElementById("Save_item").innerHTML = "Saved!";
document.getElementById("Save_item").disabled = true;
add_btn.disabled = false;
submit_day_btn.disabled=false;



var from_Cell_Box = this.parentNode.cellIndex;
var get_Input_cell_value = document.getElementById("item_input").value;
var return_Item = from_Cell_Box = get_Input_cell_value;
console.log("Item SAVED: "+ return_Item);
Added_item = {"ITEM": return_Item}
A_Newly_Added_Row.ITEM = return_Item;    
From_Json_array.push(A_Newly_Added_Row);
console.log(From_Json_array); 
       
}




}



function Remove_Row(Table_row)
{
var empTab = document.getElementById('Display_Table');
var Table_Index = Table_row.parentNode.parentNode.rowIndex;
empTab.deleteRow(Table_Index);

var arrayLength= From_Json_array.length;
var x = arrayLength - Table_Index;
var position_index = x -1;

 From_Json_array.splice(position_index, 1);
 console.log(From_Json_array);
 Add_USD_Values();
 Subtract_Budget_VND();

}
function Add_USD_Values(){
var From_table = document.getElementById("Display_Table");
var length_Of_Table = From_table.rows.length;

var Sum_of_VND_Values = 0;
for (var i=0; i < length_Of_Table; i++){
Sum_of_VND_Values = Sum_of_VND_Values + parseInt(From_table.rows[i].cells[3].innerHTML);
var Converted_USD_Total = parseInt(Sum_of_VND_Values) / 23306.60; 
var Change_Added_USD_Total =document.getElementById("Total_From_USD").innerHTML = "$"+Converted_USD_Total.toFixed(2);
added_value = {"TOTAL": Change_Added_USD_Total};
console.log("USD added Total:\t"+ JSON.stringify(added_value));



}

console.log("SUM: $"+ Converted_USD_Total.toFixed(2));
}
function Subtract_Budget_VND()
{

var From_table = document.getElementById("Display_Table");
var length_Of_Table = From_table.rows.length;

var VND_Budget = localStorage.getItem("SetDailyBudget");

for (var i=0; i < length_Of_Table; i++){
VND_Budget = VND_Budget - parseInt(From_table.rows[i].cells[3].innerHTML);
var Change_Subtracted_VND_Total =   document.getElementById("VND_Budget").innerHTML = VND_Budget;
var USD_Budget =  parseInt(VND_Budget) / 23306.60;
var Change_Subtracted_USD_Total=  document.getElementById("USD_Budget").innerHTML = "$"+USD_Budget.toFixed(2);
subtracted_value_USD = {"USD":Change_Subtracted_USD_Total};
subtracted_value_VND = {"VND": Change_Subtracted_VND_Total};
console.log("Subtracted USD:\t"+ JSON.stringify(subtracted_value_USD)+
"\nSubtracted VND:\t"+JSON.stringify(subtracted_value_VND));


}

}
function SaveArray(){
Saved_Array_Position++;
var Name_Of_Amount_Or_Date = document.getElementById("Input_Amount_and_Date");
var Get_Date_Value = Name_Of_Amount_Or_Date.elements["datetime"].value; 

localStorage.setItem("DATE: "+ Saved_Array_Position, Get_Date_Value);
From_Daily_record_array.push(Recorded_Balances,subtracted_value_VND,subtracted_value_USD,added_value);
display_table=false;
console.log("Boolean\t"+ display_table);
Remove_Current_Table(display_table, data_Boolean);



var Stringed_Array = JSON.stringify(From_Json_array)



console.log(From_Daily_record_array);

Save_Array_To_LocalStorage(Saved_Array_Position, Stringed_Array);



alert("Data is saved!");

}

function Save_Array_To_LocalStorage(Saved_Array_Position,Stringed_Array)
{
var Array_Position = Saved_Array_Position;
localStorage.setItem(Array_Position, Stringed_Array);
var Stringed_Record_array = JSON.stringify(From_Daily_record_array);
localStorage.setItem("DAILY RECORD: "+Array_Position, Stringed_Record_array);
From_Json_array = [];  
From_Daily_record_array = [];
Create_Button_From_Saved(Array_Position);
}
function Create_Button_From_Saved(Array_Position){

console.log("Array_Position:\t"+ Array_Position);
var Submitted_Date= localStorage.getItem("DATE: "+ Array_Position);
var Returned_Array = localStorage.getItem(Array_Position);
var RETURNED_DAILY_RECORD = localStorage.getItem("DAILY RECORD: "+ Array_Position);
var From_Array_Button = document.createElement("button");
From_Array_Button.setAttribute("id", Array_Position);
From_Array_Button.innerHTML = Submitted_Date ;  //Button Text
document.body.appendChild(From_Array_Button); //display it to body

document.getElementById(Array_Position).onclick = function()
{ //When Clicked...
Display_Array_On_Table(Array_Position, Returned_Array, RETURNED_DAILY_RECORD);

    
}


}

function Display_Array_On_Table(Array_Position, Returned_Array, RETURNED_DAILY_RECORD){
if (Array_Position in localStorage){ //if 1,2,3... exists in a key in local Storage
Data_btn++;


Returned_Array = JSON.parse(Returned_Array)
RETURNED_DAILY_RECORD= JSON.parse(RETURNED_DAILY_RECORD);
var From_table = document.getElementById("Saved_Data_Table");
var record_table = document.getElementById("Recorded_table");


var key0=Object.keys(RETURNED_DAILY_RECORD)[0];
var key1=Object.keys(RETURNED_DAILY_RECORD)[1];
var key2=Object.keys(RETURNED_DAILY_RECORD)[2];
var key3=Object.keys(RETURNED_DAILY_RECORD)[3];

var value0= RETURNED_DAILY_RECORD[key0];
var value1= RETURNED_DAILY_RECORD[key1];
var value2= RETURNED_DAILY_RECORD[key2];
var value3= RETURNED_DAILY_RECORD[key3];


console.log("KEY: "+ JSON.stringify(value0));

var Budget_Cell = document.getElementById("Your_Budget"); 
var Sub_VND_Cell = document.getElementById("VND_Budget");
var Sub_USD_cell = document.getElementById("USD_Budget");
var Added_total_cell = document.getElementById("Total_From_USD");

Budget_Cell.innerHTML = JSON.stringify(value0);

Sub_VND_Cell.innerHTML = JSON.stringify(value1);
Sub_USD_cell.innerHTML = JSON.stringify(value2);
Added_total_cell.innerHTML = JSON.stringify(value3);


for (var i=0; i <Object.keys(Returned_Array).length; i++)
{
var key = Object.keys(Returned_Array)[i];
var value = Returned_Array[key];


var From_row= From_table.insertRow(i);
var item_Cell = From_row.insertCell(0);
var From_VND_Cell = From_row.insertCell(1);
var USD_cell = From_row.insertCell(2);

item_Cell.innerHTML = "Purchased: "+ JSON.stringify(value["ITEM"]);
item_Cell.innerHTML.replace(/"/g,"");
From_VND_Cell.innerHTML ="₫\t\t\t"+JSON.stringify(value["VND"]);
From_VND_Cell.innerHTML.replace(/"/g,"");
USD_cell.innerHTML = "$\t\t\t"+JSON.stringify(value["USD"]);
USD_cell.innerHTML.replace(/"/g,"");

}

if (Data_btn > 1)
{
data_Boolean =false;
 Remove_Current_Table(display_table, data_Boolean);
}
}else{
console.log("Does not Exist!");
}

}

function RemoveAll(){
location.reload();
localStorage.clear();
}
function Remove_Current_Table(display_table, data_Boolean){

if (display_table == false)
{
var HideTable = document.getElementById("Display_Table");

while(HideTable.hasChildNodes())
{
HideTable.removeChild(HideTable.firstChild);
}
display_table=true;
console.log("MAIN Table removed\n Back to\t"+display_table);

}
if (data_Boolean == false)
{
var HideSavedTable = document.getElementById("Saved_Data_Table");

while(HideSavedTable.hasChildNodes())
{
HideSavedTable.removeChild(HideSavedTable.firstChild);
}
data_Boolean=true;
console.log("Saved Table removed:\t"+ data_Boolean);
Data_btn=0;
console.log("Data btn\t"+ Data_btn);
}

}
function On_Start_browser(){

document.body.style.backgroundColor = "lightgrey";
for (var Saved_btn=0; Saved_btn<10; Saved_btn++)
{
if (Saved_btn in localStorage && "DAILY RECORD: "+ Saved_btn in localStorage) 
{

   var DATE =localStorage.getItem("DATE: "+ Saved_btn);

    var load_array_btn = document.createElement("button");
    document.body.appendChild(load_array_btn);
    load_array_btn.innerHTML = DATE;

}


}







}
function load_Set_Budget(){
  var loadBudget = localStorage.getItem("SetDailyBudget");
  if (loadBudget){
      document.getElementById("budgetP").innerHTML = loadBudget + " Daily";
  }
} 
