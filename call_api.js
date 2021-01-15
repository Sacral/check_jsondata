
var app = new Vue({
    el: '#app',
    data: {
      message: '',
      res:'',
      api_url:'',
      json_data:''
    },
    methods: {
        clear_input:function(){
           
            this.api_url="";
            this.json_data="";
            this.res="";
 
          },
        reverseMessage: function () {
    
            var that = this;
            var api__url=this.api_url;
            var json__data=this.json_data;
        
            var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
            
            var chkurl;
            var chkjson;

            var spaceurl=api__url.split(" ").join("").length;
            var spacejson =json__data.split(" ").join("").length;

            if(spaceurl!=0&&spacejson!=0){

                if(RegExp.test(api__url)){
                    chkurl=true;
                }
                else{
                    alert("非 url 的格式");
                }
                if(this.isJSON(json__data)){
                    chkjson=true;
                }
            }
            else{
                alert("不得空白");
            }

            if(chkurl && chkjson){

                $.ajax({
                    url: api__url,                        
                    type: 'POST',
                    //xhrFields: {withCredentials: true},application/json
                    contentType:'application/json; charset=utf-8',
                    dataType: 'json',                   
                    data: json__data,
                    crossDomain : true,  
                    headers: {
                        "accept": "application/json",
                    },     
                    error: function (xhr) {
                        console.log(xhr);
                     },    
                    success: function (data) { 
    
                        that.res = JSON.stringify(data);
        
                    }
                });
        
            }

        },
         isJSON: function(str) {

            if (typeof str == 'string') {
                try {
                    var obj=JSON.parse(str);
                    if(typeof obj == 'object' && obj ){

                        if(obj.Phone!=""){
                            return true;
                        }
                        else{
                            alert("Phone 不得空白");
                            return false;
                        }

                    }else{
                        alert("非 json 的格式");
                        return false;
                    }
        
                } catch(e) {
                    console.log('error：'+str+'!!!'+e);
                    alert("非 json 的格式");
                    return false;
                }
            }
            console.log('It is not a string!')
        }
      },
      


  })




