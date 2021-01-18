
var app = new Vue({
    el: '#app',
    data: {
      message: '',
      res:'',
      api_url:"http://cigna.great3.com.tw/campaign/egentic/egentic_api.php",
      json_data:'{"Name" : "測試", "ID" : "f12345", "Phone" : "444", "Birthday" : "2021-01-11","ref01" : "310113002","ref02" : "eGENTIC_warm}", "Consent_status" : "1", "Consent_date" : "2021-01-11", "Other1" : "{{1}}", "Remark" : "{{1}}", "Email": "{{1}}","Gender": "a", "M_income": "a", "Y_income": "a", "Product": "a", "Interest": "a", "Gift": "a", "Announce_date": "2021-01-11", "Award_date": "2021-01-11"}'
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
                    //contentType:'application/json; charset=utf-8',
                    dataType: 'json',                   
                    data: json__data,
                    crossDomain : true,  
                    /*headers: {
                        "accept": "application/json",
                        "Access-Control-Allow-Credentials": true
                    },*/     
                    error: function (xhr) {                      
                        that.res = "post失敗"
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




