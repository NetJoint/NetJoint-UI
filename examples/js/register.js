var oSelectClause = document.getElementById('selectClause');
var oAgreeClause = document.getElementById('agreeClause');
var oRegister = document.getElementById('register');

//判断复选框是否选中
oSelectClause.onclick = function(){
    if(oSelectClause.checked==false){
        oAgreeClause.style.display = 'block';
    }
    else{
        oAgreeClause.style.display = 'none';
    }
}
//单击“立即注册”按钮时判断复选框是否选中
oRegister.onclick = function(){
    if(oSelectClause.checked==false){
        oAgreeClause.style.display = 'block';
    }
}

