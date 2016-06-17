var oAccount = document.getElementById('accountName');
var oName = document.getElementById('name');

oName.onblur = function(){
    if(oName.value==''){
        oAccount.style.display='inline-block';
    }else{
        oAccount.style.display='none'; 
    }
}
oName.onfocus = function(){
    oAccount.style.display='none';
}


