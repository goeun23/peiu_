<template>
	<!-- 본문컨텐츠 영역 -->
	<div class="dashboard_wrap">
		<div class="dashboard_box current">
			<strong class="title active"><a href="#">기능로그 <i class="xi-angle-up" aria-hidden="true"></i></a></strong>
			<div class="conts active">
				<div class='func_log_wrap'> 
					<table id='func_table' class="data_table center"> 
						<thead>
							<tr>
								<th>idx</th>
								<th>사용자</th>
								<th>로그</th>
								<th>시간</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="row in func_log_data" v-bind:key="row.PK">
								<td>{{row.PK}}</td>
								<td>{{row.username}}</td>
								<td>{{row.message}}</td>
								<td>{{row.timestamp}}</td>
							</tr> 
						</tbody>
					</table>
					
					<div class="pagination1" id="page1"> 
						<div>Page : {{(offset1/limit1)+1}}</div>
						<div @click="getPreviouse1()">Previouse</div>
						<div @click="getNext1()">Next</div>
					</div>
				</div>
			</div>
		</div>

		<div class="dashboard_box">
			<strong class="title"><a href="#">메뉴로그 <i class="xi-angle-up" aria-hidden="true"></i></a></strong>
			<div class="conts active">
				<div class='menu_log_wrap'>
					<table id='menu_table' class="data_table center"> 
						<thead>
							<tr>
								<th>idx</th>
								<th>사용자</th>
								<th>로그</th>
								<th>시간</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="row in menu_log_data" v-bind:key="row.PK">
								<td>{{row.PK}}</td>
								<td>{{row.username}}</td>
								<td>{{row.message}}</td>
								<td>{{row.timestamp}}</td>
							</tr> 
						</tbody>
					</table>					
					<div class="pagination2" id="page2"> 
						<div>Page : {{(offset2/limit2)+1}}</div>
						<div @click="getPreviouse2()">Previouse</div>
						<div @click="getNext2()">Next</div>
					</div>
				</div>
			</div>
		</div>
		  
	</div>
	<!-- //본문컨텐츠 영역 -->
	
</template>
<script>  
  // import { cube } from '~/assets/my-module';
 
  export default {
    layout: "systemLog",

    components: {  
    },
    head: {
	  link: [ 
		{rel : 'stylesheet', href : '/css/jqGrid/ui.jqgrid.css'},
		//   {rel : 'stylesheet', href : 'https://cdn.datatables.net/1.10.19/css/dataTables.material.min.css'},
		//   {rel : 'stylesheet', href : 'https://cdn.datatables.net/1.10.19/css/jquery.dataTables.min.css'}
		// {rel : 'stylesheet', href :'https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.3/css/foundation.min.css'},
		// {rel : 'stylesheet', href :'https://cdn.datatables.net/1.10.19/css/dataTables.foundation.min.css'},
      ],
      script: [
		{src : '//cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js'}
      ]
    },
    data(){
      return{ 
		url_drill : process.env.url_drill,
		func_log_data : [],
		menu_log_data : [],
		func_table : null,
		menu_table : null,
		offset1 : 0,
		limit1 : 15,
		offset2 : 0,
		limit2: 15,
		recvFuncLog : '',
		recvMenuLog : '',
      }
    },
	methods:
	{   
		getPreviouse1 : function()
		{
			if((this.offset1 - this.limit1) >=0)
			{
				this.offset1 -= this.limit1; 
				this.func_log_data = [];
				for(var index = this.offset1; index < this.recvFuncLog.length && index < (this.offset1 + this.limit1); index++){
					var value = this.recvFuncLog[index];
					this.func_log_data.push(value);
				}
			}else{
				alert('데이터가 없습니다.')
			}
		},
		getNext1 : function(){
			this.offset1 += this.limit1; 
			if(this.offset1 >= this.recvFuncLog.length)
			{
				alert('데이터가 없습니다.');
			}else{
				this.func_log_data = [];
				for(var i= this.offset1; i < this.recvFuncLog.length && i <  (this.offset1 + this.limit1); i++){
					var value = this.recvFuncLog[i];
					this.func_log_data.push(value);
				}
			}
		},
		getPreviouse2 : function()
		{
			if((this.offset2 - this.limit2) >=0)
			{
				this.offset2 -= this.limit2; 
				this.menu_log_data = [];
				for(var index = this.offset2; index < this.recvMenuLog.length &&  index <  (this.offset2 + this.limit2); index++){
					var value = this.recvMenuLog[index];
					this.menu_log_data.push(value);
				}
			}else{
				alert('데이터가 없습니다.')
			}
		},
		getNext2 : function(){
			this.offset2 += this.limit2; 
			if(this.offset2 >= this.recvMenuLog.length)
			{
				alert('데이터가 없습니다.');
			}else{
				this.menu_log_data = [];
				for(var i= this.offset2; i < this.recvMenuLog.length && i< (this.offset2 + this.limit2); i++){
					var value = this.recvMenuLog[i];
					this.menu_log_data.push(value);
				}
			}
		},
		getFuncLog : function()
		{
			this.offset1 = 0;
			var url = this.url_drill;
			var data = {
				queryType : "SQL",
				query : "SELECT * FROM mysql.aggdb.function_log"
			};
			data = JSON.stringify(data);
			$.ajax({
				url : url,
				contentType:'application/json',
				data : data,
				type : 'post',
				success : this.getFuncLogResult,
				error : function(jqXHR, textStatus, errorThrown){
					alert('기능로그 조회 실패(통신에러)');
				}
			});
		},
		getFuncLogResult : function(data, textStatus, jqXHR)
		{
			if(textStatus == 'success'){
				if(data.rows.length> 0){
					this.recvFuncLog = data.rows.slice();
					
					for(var index=0; index < this.recvFuncLog.length && (index < this.limit1); index++){
						var value = this.recvFuncLog[index];
						this.func_log_data.push(value);
					} 
				}else
				{
					alert('데이터가 없습니다.');
				}
			}
		},
		getMenuLog : function()
		{	
			this.offset2 = 0;
			var url = this.url_drill;
			var data = {
					queryType : "SQL",
					query : "SELECT * FROM mysql.aggdb.menu_log"
			};
			data = JSON.stringify(data);
			$.ajax({
				url : url,
				contentType:'application/json',
				data : data,
				type : 'post',
				success : this.getMenuLogResult,
				error : function(jqXHR, textStatus, errorThrown){
					alert('메뉴로그 조회 실패(통신에러)');
				}
			});
		},
		getMenuLogResult : function(data, textStatus, jqXHR)
		{
			if(textStatus == 'success'){
				if(data.rows.length> 0){					
					this.recvMenuLog = data.rows.slice();
					for(var i=0; i < i < this.recvMenuLog.length && (i < this.limit2); i++){
						var value = this.recvMenuLog[i];
						this.menu_log_data.push(value);
					}
					
					// setTimeout(function(){
					// 	$("#menu_table").dataTable().fnDestroy();
					// 	this.menu_table = $('#menu_table').DataTable(
					// 			{
					// 				 scrollY: 600,
					// 				"scrollCollapse": true,
					// 				"info":           true,
					// 				"paging":         true
					// 			}
					// 		);
					// },10);
				}else
				{
					alert('데이터가 없습니다.');
				}
			}
		},
		
		dashboardTab : function(){
				var dashboardTab_param = $(".dashboard_wrap");
				var dashboardTab_btn = dashboardTab_param.find(".title > a");
				var dashboardTab_obj = dashboardTab_param.find(".conts");
				var event = "click";
				dashboardTab_btn.parent().eq(0).addClass("active");
				dashboardTab_obj.eq(0).addClass("active");
				dashboardTab_btn.parent().parent().eq(0).addClass("current");
				dashboardTab_btn.on(event,function(ev){
				var t = $(this);

				if(t[0].innerText == "기능로그"){
					document.getElementById('page1').style.display = 'block';
					document.getElementById('page2').style.display = 'none';
				}else{
					document.getElementById('page1').style.display = 'none';
					document.getElementById('page2').style.display = 'block';
				}
				dashboardTab_btn.parent().removeClass("active");
				dashboardTab_obj.removeClass("active");
				dashboardTab_btn.parent().parent().removeClass("current");
				t.parent().addClass("active");
				t.parent().next().addClass("active");
				t.parent().parent().addClass("current");
				ev.preventDefault();
			});
		}, 
	},
	middleware : 'authenticated',
	mounted() 
	{
		 this.getFuncLog();
		 this.getMenuLog();
		 this.dashboardTab();
	}
}

  

</script>

<style>
 
.menu_log_wrap, .func_log_wrap{width:100%;height:52rem;padding :1.5rem} 
.pagination1 {     display: inline-block; bottom: 9vh; position: fixed; right: 1vw; }
.pagination1 div { color: white; float: left; padding: 8px 16px; text-decoration: none; transition: background-color .3s;cursor: pointer;}
.pagination1 div.active { background-color: #4CAF50; color: white; }
.pagination1 div:hover:not(.active) {background-color: #ddd;}

.pagination2 {     display: inline-block; bottom: 5vh; position: fixed; right: 1vw; }
.pagination2 div { color: white; float: left; padding: 8px 16px; text-decoration: none; transition: background-color .3s;cursor: pointer;}
.pagination2 div.active { background-color: #4CAF50; color: white; }
.pagination2 div:hover:not(.active) {background-color: #ddd;}


#page2{display: none;}

</style>
