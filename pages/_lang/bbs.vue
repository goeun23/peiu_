<template>
    <div class="bbs_wrap">
        <strong>건의사항/비고</strong>
        <div class="bbs_contents">
            <div class="bbs_content">
                <div class="bbs_content_table">
                    <table   class="bbs_table portal_table data_table center" summary="Board">
                        <caption>번호,제목,작성자,날짜,답변여부</caption>
                        <colgroup>
                            <col style="width:5%"/>
                            <col style="width:50%"/>
                            <col style="width:10%"/>
                            <col style="width:10%"/>
                            <col style="width:5%"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>IDX</th>
                                <th>Title</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Answer(?)</th>
                            </tr>
                        </thead>
                        <tbody class="bbs_tbody">
                            <tr v-for="row in rows" v-bind:key="row.idx">
                                <td><span>{{row.idx}}</span></td>
                                <td ><span class="bbs_title" @click="showContentsBox(row.idx)">{{row.title}}</span></td>
                                <td><span>{{row.name}}</span></td>
                                <td><span>{{row.date}}</span></td>
                                <td><span>{{row.hasAnswer}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
            
        </div> 
        <div class="modal_btn_div">
            <input type="button" value="글쓰기" @click="showWritePopup()">
        </div>  

        <div id="writingModal" class="modal">
            <div class="modal-content">
                <span class="close-button" @click="closeWritePopup()">&times;</span>
                <form id="write_contents_form" action="">
                    <table class="portal_table data_table center">
                        <thead>
                            <!-- <colgroup>
                                <col style="width:30%;">
                                <col style="width:70%;">
                            </colgroup>                         -->
                        </thead>
                        <tbody> 
                            <tr>
                                <th>타이틀*</th>
                                <td><input  type="text" class="title_input" v-model="bbs_title"></td>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td>{{UserName}}</td>
                            </tr>
                            <tr>
                                <th>내용*</th>
                                <td>
                                    <textarea class="textarea_contents" v-model="bbs_text" name="" id="" cols="30" rows="10"></textarea>
                                </td>
                            </tr>
                            <tr id="tr_answer">
                                <th>답변</th>
                                <td><input type="text" id="reply_contents" class="title_input" v-model="answer_message"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="modal_btn_div">
                        <input type="button" id='btn_save' value="Save" @click="writeBBS()">                        
                        <input type="button" id='btn_edit' value="Edit" @click="updateBBS()">                         
                        <input type="button" id='btn_del' value="Del" @click="deleteBBS()">
                        <input v-if="isRoot" type="button" id='btn_reply' value="Reply" @click="replyBBS()">
                    </div>
                </form> 
            </div>
        </div>
        
		<div class ="progressbar">
			<div class="lds-facebook"><div></div><div></div><div></div></div>
		</div>
    </div>
</template>

<script>
const cookieparser = require('cookieparser');

export default {
    layout : 'board',
    head:{
        link : [
            {rel : 'stylesheet', href : '/css/jqGrid/ui.jqgrid.css'},
        ],
        scripts: [
            // {src:'https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/1.4.0/perfect-scrollbar.min.js'}
        ]
    },
    data(){
        return{
            rows:[],  
            url_bbs_list : process.env.url_bbs_list,
            url_bbs_write : process.env.url_bbs_write,
            url_bbs_update : process.env.url_bbs_update,
            url_bbs_reply : process.env.url_bbs_reply,
            url_bbs_delete : process.env.url_bbs_delete,
            bbs_title : '',
            bbs_text : '',
            currentRow : null,
            answer_message : '',
            UserName : '',
            UserEmail : '',
            AuthorityLevel : 0,
            isRoot : false, 
        }
    },
    methods:{
        checkAuth : function(){
            var cookie = cookieparser.parse(document.cookie);
            this.AuthorityLevel =Number(cookie.AuthorityLevel);
            this.UserName = cookie.UserName;
            this.UserEmail = cookie.Email;
            
            if(this.AuthorityLevel == 2047){
                this.isRoot = true;
                document.getElementById('reply_contents').disabled = false;
            }else{
                document.getElementById('reply_contents').disabled = true;
                document.getElementById('reply_contents').style.background = '#928881';
            }
        },
        showContentsBox : function(idx){
            console.log('aa');
            for(var i=0; i < this.rows.length; i++)
            {
                if(this.rows[i].idx === idx)
                {
                    this.bbs_title = this.rows[i].title;
                    this.bbs_text = this.rows[i].comment;
                    this.answer_message = this.rows[i].Answer;
                    this.currentRow = this.rows[i];
                    break;
                }
            }
            document.getElementById('btn_save').style.display = 'none';
            document.getElementById('btn_edit').style.display = 'block';
            document.getElementById('btn_del').style.display = 'block';

            if(this.isRoot == true)
            {
                document.getElementById('btn_reply').style.display = 'block';
            }
            
            document.getElementById('tr_answer').style.visibility = 'visible';
            document.getElementById('tr_answer').style.display = '';            
            document.querySelector('#writingModal .modal-content').style.height = '50%';

            document.getElementById('writingModal').classList.toggle('show-modal');
        },
        closeContentsBox : function(idx){
            // document.getElementById('contents_form').reset();
            document.getElementById('modal').classList.toggle('show-modal');
            // document.getElementsByClassName('bbs_contents_div')[0].style.display = 'none';
        },
        showWritePopup : function(){
            console.log('showWritePopup');
            this.bbs_title = '';
            this.bbs_text = '';
            this.answer_message = '';

            document.getElementById('btn_save').style.display = 'block';
            document.getElementById('btn_edit').style.display = 'none';
            document.getElementById('btn_del').style.display = 'none'; 
            document.getElementById('btn_reply').style.display = 'none';
            // if(this.isRoot == true)
            // {
            //     document.getElementById('btn_reply').style.display = 'block';
            // }
            // document.querySelector('#write_contents_form #tr_answer').style.visibility = 'hidden';
            document.getElementById('tr_answer').style.display = 'none';

            
            document.querySelector('#writingModal .modal-content').style.height = '45%';
            document.getElementById('writingModal').classList.toggle('show-modal');
        },
        closeWritePopup : function(){
            // document.getElementById('write_contents_form').reset();
            document.getElementById('writingModal').classList.toggle('show-modal');
        },
        deleteBBS : function(){
            var url = this.url_bbs_delete + '?id='+ this.currentRow.idx;
            $.ajax({
                url : url,
                type : 'delete',
                contentType : 'application/json',
                xhrFields: {withCredentials:true}, 
                success : this.recvDelBBSResp,
                beforeSend : function(){
                    // console.log('before request');
                    $('.progressbar').css('display','block');
                },
                error : function(jqXHR, textStatus, errorThrown){ 
                    alert(textStatus); 
                    $('.progressbar').css('display','none');
                    console.log('delete error');
                    console.log(jqXHR);
                }
            }); 
            document.getElementById('writingModal').classList.toggle('show-modal'); 
        },
        recvDelBBSResp : function(data, textStatus, jqXHR){
            alert('삭제되었습니다.');  
            
            $('.progressbar').css('display','none');
            this.getBBSList();
        },
        updateBBS : function(){
            var sendData = {
                PK : this.currentRow.idx,
                Title : this.bbs_title,
                Comment : this.bbs_text
            };
            sendData = JSON.stringify(sendData);
             $.ajax({
                url : this.url_bbs_update,
                type : 'put',
                contentType : 'application/json',
                xhrFields: {withCredentials:true},
                data : sendData,
                success : this.recvUpdateBBSResp,
                beforeSend : function(){
                    // console.log('before request');
                    $('.progressbar').css('display','block');
                },
                error : function(jqXHR, textStatus, errorThrown){ 
                    alert(textStatus); 
                    $('.progressbar').css('display','none');
                    console.log('update error');
                    console.log(jqXHR);
                }
            });
            
            document.getElementById('writingModal').classList.toggle('show-modal');
        },
        recvUpdateBBSResp : function(data, textStatus, jqXHR){ 
           $('.progressbar').css('display','none');
           if(data.code === 'PostNotFound'){
               console.log('recvUpdateBBSResp = ' + data.description);
           }
           else{
               this.getBBSList();
               alert('수정 완료'); 
           }
        },
        writeBBS : function(){
            if(this.bbs_title.length <= 0){
                alert('제목 입력 필수');
                return;
            }
            if(this.bbs_text.length <=0){
                alert('내용 입력 필수')
                return;
            }
            if(this.bbs_title.length > 0 && this.bbs_text.length > 0){
                document.getElementById('writingModal').classList.toggle('show-modal');
                var sendData = {Title : this.bbs_title, Comment : this.bbs_text, PostUserName : this.UserName};
                sendData = JSON.stringify(sendData);
                $.ajax({
                    url : this.url_bbs_write,
                    type : 'post',
                    contentType : 'application/json',
                    data : sendData,
                    success : this.recvWriteBBSResp,
                    beforeSend : function(){
						// console.log('before request');
                        $('.progressbar').css('display','block');
					},
                    error : function(jqXHR, textStatus, errorThrown){
                        
                        
                        alert(textStatus);
                        
                        $('.progressbar').css('display','none');
                        console.log('writeBBS error');
                        console.log(jqXHR);
                    }
                })  
            }
        },
        recvWriteBBSResp :  function(data, textStatus, jqXHR){
            $('.progressbar').css('display','none');  
            if(textStatus == 'success')
            {
                this.getBBSList();
            }else
            {
                alert('작성 실패');
                console.log('작성실패');
                console.log(textStatus);
            }
        },
        addRow : function(idx, title, name,  date, hasAnswer, comment, Answer){ 
            try{
                this.rows.push({
                    idx : idx,
                    title :title,
                    name : name,
                    date : date,
                    hasAnswer : hasAnswer,
                    comment : comment,
                    Answer : Answer
                }); 
            }catch(e){
                console.log(e);
            } 
        },pad2(n) {  // always returns a string
            return (n < 10 ? '0' : '') + n;
        },uuidv4 : function() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        getBBSList : function(){
            
            $.ajax({
                url : this.url_bbs_list,
                type : 'get',
                contenttype : 'application/json',
                success : this.recvList,
                error : function(jqXHR, textStatus, errorThrown){
                    alert(textStatus);
                }
            })
        },
        recvList : function(data, textStatus, jqXHR){
            this.rows = [];

            var values = data.results.sort(function(a, b){
                return a.FeedbackId > b.FeedbackId ? -1 : a.FeedbackId < b.FeedbackId ? 1 : 0;   
            });

            values.forEach((value, index, array) => {
                // console.log(value);
                this.addRow(value.PK ,value.Title, value.PostUserName, 
                            value.WriteDate, value.hasAnswer, value.Comment, value.Answer);
            })
        }, 
        replyBBS : function(){
            /*
                {
                    "FeedbackId" : "2",
                    "answermessage" : "대충 하시오!!",
                    "AnswerUserName" : "대답자"
                }
            */
           if(this.answer_message.length > 0){
               var sendData = {
                    FeedbackId : this.currentRow.idx,
                    answermessage : this.answer_message,
                    AnswerUserName :'머시머시'
                };
                sendData = JSON.stringify(sendData);
                $.ajax({
                    url : this.url_bbs_reply,
                    type : 'post',
                    contentType : 'application/json',
                    xhrFields: {withCredentials:true},
                    data : sendData,
                    success : this.recvReplyBBS,
                    beforeSend : function(){
                        // console.log('before request');
                        $('.progressbar').css('display','block');
                    },
                    error : function(jqXHR, textStatus, errorThrown){ 
                        alert(textStatus); 
                        $('.progressbar').css('display','none');
                        console.log('reply error');
                        console.log(jqXHR);
                    }
                });
                this.answer_message = '';
                document.getElementById('writingModal').classList.toggle('show-modal');
           }else
           {
               alert('답장 내용이 비어있습니다.')
           }
            
        },
        recvReplyBBS : function(data, textStatus, jqXHR){
            $('.progressbar').css('display','none');
            this.getBBSList();
        }
    },    
    middleware : 'authenticated',
    fetch ({store, params}){
        // console.log('get bbs list start');
        // this.getBBSList();        
        // console.log('get bbs list end');
    },
    mounted() { 
        
		$('.progressbar').css('display','none');
        console.log('get bbs list start');
        this.checkAuth();
        this.getBBSList();        
        console.log('get bbs list end');

        new PerfectScrollbar('.bbs_content');//커스텀 스크롤
        // $('#bbs_tbody').perfectScrollbar();
        // setTimeout(() =>{
        //     new PerfectScrollbar('#bbs_tbody');//커스텀 스크롤
        // },500);
        
    },
}
</script>

<style>
#tr_answer{visibility: visible;}
.bbs_title{text-decoration: solid underline;cursor: pointer;}
.bbs_modal{display:none;position: absolute; top:0; left: 0; width: 100%;height: 100%;background: #595959; opacity: .8;padding: 17rem;}
.bbs_modal table tbody th{width:30%;}
.bbs_modal table tbody td{width:70%;}
.modal_btn_div{display:block;margin:.3rem;float:right;border-top: 1px solid grey;}
.bbs_wrap{height:58rem;}
/* .bbs_contents{height:55rem;} */
.bbs_wrap > strong {display: block; margin: 0.9375rem; font-weight: bold;font-size: 1.375rem;line-height: 1.875rem; color: #fff; letter-spacing: -0.0625rem;}
.bbs_content_table{ height:53rem;}
#bbs_table, #bbs_tbody{height:50rem;}
.modal { position: fixed; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);  opacity: 0; visibility: hidden; transform: scale(1.1); transition: visibility 0s linear 0.25s, opacity 0.25s 0s, transform 0.25s; }
.modal-content { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #708090; padding: 1rem 1.5rem; width: 60%; height: 50%; border-radius: 0.5rem; }
.modal-content-reply { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #708090; padding: 1rem 1.5rem; width: 60%; height: 45%; border-radius: 0.5rem; }
.close-button {float: right; width: 1.5rem;line-height: 1.5rem;text-align: center; cursor: pointer; border-radius: 0.25rem; background-color: lightgray; }
.close-button:hover { background-color: darkgray; }
.show-modal { opacity: 1; visibility: visible; transform: scale(1.0); transition: visibility 0s linear 0s, opacity 0.25s 0s, transform 0.25s;}
.textarea_contents{width:80%;height:80%;border-radius: 10px;padding:1.1rem;}
.title_input{width:80%!important;height:80%!important;border-radius: 10px;padding:.3rem!important;}
textarea:focus, [type=text]:focus {background-color: lightblue;}
.modal_btn_div input[type=button]{margin:0 .3rem; float: left;}
.modal_btn_div input::after{clear:both;}
/* #tr_answer{display:block;} */
/* progress bar animation */
.progressbar{ display: block; position: absolute; background-color: lightslategray;	opacity: .3;	width: 100%;	height: 100%;	top : 0;}
.lds-facebook {display: inline-block;  position: absolute; width: 64px; height: 64px; top : 50%; left: 50%;}
.lds-facebook div { display: inline-block;  position: absolute; left: 6px; width: 13px; background: #fff;  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;}
.lds-facebook div:nth-child(1) {left: 6px; animation-delay: -0.24s;}
.lds-facebook div:nth-child(2) { left: 26px; animation-delay: -0.12s;}
.lds-facebook div:nth-child(3) { left: 45px; animation-delay: 0;}

@keyframes lds-facebook {
  0% {
    top: 6px;
    height: 51px;
  }
  50%, 100% {
    top: 19px;
    height: 26px;
  }
}
</style>

