require.config({
    paths: {
        "netjoint-ui": "../../dist/js/netjoint-ui",
    }
});
require(['netjoint-ui'], function () {
    (function (window, undefined) {
        'use strict';

        $(function () {
            var oName = document.getElementById('name');//用户名输入框
            var oLostName = document.getElementById('lostName');//用户名提示
            var oPassword = document.getElementById('password');//密码输入框
            var oLostPass = document.getElementById('lostPass');//密码提示
            var oSubmit = document.getElementById('submit');//确定按钮

            oName.onblur = function(){
                if(oName.value==""){
                    oLostName.style.display="block";
                }
            }//用户名框失去焦点时的判断

            oName.onfocus = function(){
                    oLostName.style.display="none";
            }//用户名框获得焦点时关闭提示

            oPassword.onblur = function(){
                if(oPassword.value==""){
                    oLostPass.style.display="block";
                }
            }//密码框失去焦点时的判断

            oPassword.onfocus = function(){
                    oLostPass.style.display="none";
            }//密码框获得焦点时关闭提示

            oSubmit.onclick=function(){
                if(oName.value=='abc' && oPassword.value==123){
                    alert("耐特嘉欢迎您！");
                }else{
                    alert("用户名或密码不正确，请重新输入！");
                    oName.value="";
                    oPassword.value="";
                    oLostName.style.display="block";
                    oLostPass.style.display="block";
                }
            }//按钮点击事件的判断
        });
    })(window);
});
