<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko"><head>
<title>약관동의</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<link rel="stylesheet" type="text/css" href="/webAppDesign/S/css/style.css?tmpVer=20231101">
<link rel="stylesheet" type="text/css" href="/transkey_mobile/transkey.css">
<link rel="stylesheet" type="text/css" href="/webAppDesign/css/common.css">


<script async="" src="https://www.googletagmanager.com/gtm.js?id=GTM-P6K4G4Z"></script><script type="text/javascript" src="/webAppDesign/js/lib/jquery-3.5.0.min.js?20210611"></script>
<script type="text/javascript" src="/webAppDesign/S/js/ui.js?20200912"></script>
<script type="text/javascript" src="/webAppDesign/S/js/commonUi.js?20231102"></script>
<script type="text/javascript" src="/webAppDesign/S/js/webpay-ui.js?20210817"></script>
<script type="text/javascript" src="/webAppDesign/js/common/common.js?20231102"></script>
<script type="text/javascript" src="/AOS2/include.js?20200912"></script><script src="/AOS2/inc/debug.min.js"></script>
<script src="/AOS2/astx2/astx2_custom.js"></script>
<script src="/AOS2/astx2/astx2.min.js?r=19117"></script>
<script src="/AOS2/astx2/astx2_jq.min.js?r=16926"></script>

<script type="text/javascript" src="/AOS2/include_askd.js?20200912"></script><script src="/AOS2/askd2/askd2_custom.js"></script>
<script src="/AOS2/askd2/askd2.min.js?r=23561"></script><script src="https://dwebpay.kbcard.com/AOS2/askd2/crypto/jsencrypt.min.js"></script>
<script src="https://dwebpay.kbcard.com/AOS2/askd2/crypto/aes.min.js"></script>
<script src="https://dwebpay.kbcard.com/AOS2/askd2/crypto/sha256.min.js"></script>
<script src="https://dwebpay.kbcard.com/AOS2/askd2/crypto/x509-cert.min.js"></script>


<script type="text/javascript" src="/transkey_mobile/transkey.js?20210719"></script><script type="text/javascript" src="/transkey_mobile/TranskeyLibPack_op.js"></script><script type="text/javascript" src="/transkey_mobile/rsa_oaep_files/rsa_oaep-min.js"></script><script type="text/javascript" src="/transkey_mobile/jsbn/jsbn-min2.js"></script><script type="text/javascript" src="/transkey_mobile/typedarray.js"></script><script type="text/javascript" src="/transkeyServlet?op=getToken&amp;1769991706040"></script><script type="text/javascript" src="/transkeyServlet?op=getInitTime"></script>
<!--[if lte IE 9]>
    <script src="/webAppDesign/S/js/html5.js"></script>
    <script src="/webAppDesign/util/placeholder.js"></script>
    <![endif]-->
<script type="text/javascript">	
APPLICATION_CONTEXT_ROOT = '';
var __CHNN_TYPE = "M";
var __KBPAY_INSTALL_URL = "";
var __SESSION = "fe3239cb-9600-4597-942f-41a380933683";
var rpmUseYn = !($.util.isEmpty(""));



// $(window).load(function() {
$(window).on('load', function() {
	$('form').each(function(index, item){
		$(item).append('<input type="hidden" name="SESSION" value="' + __SESSION + '">');
		
	});
	
	// Ã«ÂÂ¼Ã¬ÂÂ¨Ã&shy;ÂÂ¤Ã&shy;ÂÂ¨Ã«ÂÂ Ã¬ÂÂÃ¬Â¹Â Ã¬Â¡Â°Ã¬Â&nbsp;Â
	$('input').each(function(index, item){
		if ($(item).attr('data-tk-bottom') == 'true') {
			$(item).attr('data-tk-bottom', false);
		}
	});
});
</script>


<script>
	if(typeof pageviewObj != 'undefined'){
	    pageviewObj.dimension2 = '';
	    pageviewObj.dimension3 = '';
	    pageviewObj.dimension4 = '';
	    pageviewObj.dimension5 = '';
	    pageviewObj.dimension6 = '';
	    pageviewObj.dimension7 = '';
	    pageviewObj.dimension12 = window.location.pathname.split("/").pop();
	    dataLayer = [pageviewObj];
	}
    
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-P6K4G4Z');
    
    $(function() {
    	$(document.body).prepend('<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P6K4G4Z" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>');
    });
    
</script>


<script type="text/javascript">
	$(function() {
		page.init();

		$(document).on('click', '.showDetail', function(e) {
			e.preventDefault();
			page.selObj = $(this).closest('li');
			page.getTermsDetail(page.selObj.data('id'), $(this));

		});

		$(document).on('click', '#agreeBtn', function() {
			page.agreeTerms();
		});
		
		$("input[id^=mktAgree]").on("click",function(){
			var idx = $('#tabView01').css('display') == 'none' ? '2' : '1';
			if ($(this).is(':checked')) {
				$('#chnnArea'+idx).show();
				$('#chnnArea'+idx).find('input:checkbox').prop('checked',
						true).change();
				$(this).closest("li").next("li").find("input[type='radio']:odd").parent().addClass("checked");
				$(this).closest("li").next("li").find("input[type='radio']:even").parent().removeClass("checked");
				
				$(this).closest("li").next("li").find("input[type='radio']:odd").prop("checked",true);
				$(this).closest("li").next("li").find("input[type='radio']:even").prop("checked",false);
			} else {
				if(!$("#mktAgree"+idx).is(':checked') && !$("#mktAgree"+(Number(idx)+2)).is(':checked')){
					$('#chnnArea'+idx).hide();
					$('#chnnArea'+idx).find('input:checkbox').prop('checked',
							false).change();
				}
				$(this).closest("li").next("li").find("input[type='radio']:odd").parent().removeClass("checked");
				$(this).closest("li").next("li").find("input[type='radio']:even").parent().addClass("checked");
				
				$(this).closest("li").next("li").find("input[type='radio']:odd").prop("checked",false);
				$(this).closest("li").next("li").find("input[type='radio']:even").prop("checked",true);
			}
		});

		$(document).on('click', '#okBtn', function() {
			page.registerMarketingAgree();
		});

		// 탭
		$(".tabType01 li a").click(function(e) {
			
			$($(this).attr("data-tabId")).find("input[id^=mktAgree]").each(function(){
			    if($(this).is(":checked")){
			    	$(this).trigger("click");
			    }else{
			    	$(this).closest("li").next().find("input[type=radio]:even").parent().trigger("click");
			    }
			});
			
			$(this).parents(".tab-list").find("a").removeClass("active");
			$(this).addClass("active");
			$(this).parents(".tabUI").find(".tab-item").hide();
			$($(this).attr("data-tabId")).show();

			page.mktMgSno = '';
			page.mktClSno = '';

			page.getTermsList();
		});

		$("input[type='radio']").on("click",function(){
			var idx = $(this).closest("ul").parent().prev().attr("id").substr(9,9);
			page.termsAreaCheck(idx);
		})
	});
	
	var page = {
		selObj : {},
		termList : [],
		mktMgSno : '',
		mktClSno : '',
		init : function() {
			page.getTermsList();
		},
		getTermsList : function() {
			var idx = $('#tabView01').css('display') == 'none' ? '2' : '1';
			var params = {};
			var data = {
				kbpayStplClNm : $('#tabView01').css('display') == 'none' ? 'termsType47,termsType116'
						: 'termsType48,termsType117'
			};
			ajax("/WPYCA01", params, data, function(response) {
				var header = response.header;
				var body = response.body;

				if (header.rsltCode == '0000') {
					var strList = '';
					var prevTitle = '';
					page.termList = body.rsltObj.kbpayStplList;
					$.each(body.rsltObj.kbpayStplList, function(i, v) {
						var type = '선택';
						if (v.kbpayStplDtcd == 2) {
							type = '필수';
						}

						$('#termsArea' + idx).data('id', v.kbpayStplMgSno);
						$('#termsArea' + idx + ' span.stat').html(
								'[' + type + '] ' + v.kbpayStplNm);
						$('#termsArea' + idx + ' a.showDetail').html(
								'[' + type + '] ' + v.kbpayStplNm);

						page.mktMgSno = v.kbpayStplMgSno;
						page.mktClSno = v.kbpayStplClSno;
						idx = Number(idx) + 2;
					});
				}
			});
		},
		getTermsDetail : function(termsNo, returnObj) {
			var params = {};
			var data = {
				kbpayStplMgSno : termsNo
			};
			ajax("/WPYCA02", params, data, function(response) {
				var header = response.header;
				var body = response.body;
				if (header.rsltCode == '0000') {
					$('#dtlTit').html(page.selObj.find('.showDetail').html());
					$('#dtlCon').html(body.rsltObj.kbpayStplCtt);
					// 자세히 보기 팝업으로 열리도록 수정(20210623)
					var link = $('#dtlCon').find('a').attr('href');
					link = 'javascript:page.btnOpnDtl("'+link+'")';
					$('#dtlCon').find('a').attr('href', link);
					
					openLayer('layer01', returnObj);
					$('#layer01 .l-contents').scrollTop(0);
				}
			});
		},
		agreeTerms : function() {
			if(!page.selObj.closest('li').find("input").is(':checked')){
				page.selObj.closest('li').find("input").trigger("click");
			}

			closeLayer('layer01');
		},
		registerMarketingAgree : function() {
			var idx = $('#tabView01').css('display') == 'none' ? '2' : '1';
			var params = {};
			
			var mktCnsDtcd = $('#mktAgree' + idx).is(':checked') ? '1' : '0';
			var naclMktCnsDtcd = $('#mktAgree' + (Number(idx)+2)).is(':checked') ? '1' : '0';
			
			page.termList[0].kbpayStplCnsYn = mktCnsDtcd == "1" ? 'Y' : 'N';
			page.termList[1].kbpayStplCnsYn = naclMktCnsDtcd == "1" ? 'Y' : 'N';
			
			var data = {
				mktTermsList: page.termList,
				mktCnsDtcd : mktCnsDtcd,
				naclMktCnsDtcd : naclMktCnsDtcd,
				telCnsDtcd : $('#telAgree' + idx).is(':checked') ? '1' : '0',
				smsCnsDtcd : $('#smsAgree' + idx).is(':checked') ? '1' : '0',
				emlCnsDtcd : $('#emlAgree' + idx).is(':checked') ? '1' : '0'
			};

			ajax("/WPYJA04", params, data, function(response) {
				var header = response.header;
				var body = response.body;

				if (header.rsltCode == '0000') {
					$('#frm').submit();
				} else {

				}
			});
		},
		btnOpnDtl : function(url){
			window.open(url, 'sPopup', 'width=370, height=430, scrollbars=1');
		},
		termsAreaCheck : function(idx){
			var check1 = "";
			var check2 = "";
			
			var termsIdx = idx%2 == 1 ? 1 : 2; 
			$("#termsArea"+termsIdx).next("li").find("input[type='radio']:checked").each(function(){
				check1 += $(this).val();
			});
			$("#termsArea"+(Number(termsIdx)+2 )).next("li").find("input[type='radio']:checked").each(function(){
				check2 += $(this).val();
			});
			if(check1.indexOf("YY") > -1 || check2.indexOf("YY") > -1){
				if(check1.indexOf("YY") > -1){
					$("#mktAgree"+termsIdx).prop("checked",true).change();
				}else{
					$("#mktAgree"+termsIdx).prop("checked",false).change();
				}
				if(check2.indexOf("YY") > -1){
					$("#mktAgree"+(Number(termsIdx)+2 )).prop("checked",true).change();
				}else{
					$("#mktAgree"+(Number(termsIdx)+2 )).prop("checked",false).change();
				}
				page.chnnAreaCheck(termsIdx,true);
			}else{
				$("#mktAgree"+idx).prop("checked",false).change();
				page.chnnAreaCheck(termsIdx,false);
			}
			
		},
		chnnAreaCheck : function(idx,flag){
			if(flag){
				$('#chnnArea'+idx).show();
			}else{
				$('#chnnArea'+idx).hide();
			}
			$('#chnnArea'+idx).find('input:checkbox').prop('checked',flag).change();
		},
		// [리팩토링] 마케팅 동의 초기화 (공통 로직 분리)
		resetMarketing: function(idx) {
			var $tabView = $('#tabView0' + idx);
			
			// 1. 채널 영역 숨김 및 내부 체크박스 해제
			$('#chnnArea' + idx).hide();
			$('#chnnArea' + idx).find('input:checkbox').prop('checked', false).parent().removeClass('checked');
			
			// 2. 메인 마케팅 동의 체크박스 해제 (mktAgree1, mktAgree3 등)
			$tabView.find("input[id^=mktAgree]").prop("checked", false).parent().removeClass("checked");
			
			// 3. 라디오 버튼 초기화 (동의하지 않음 'N'으로 설정)
			// 'N' 값을 가진 라디오를 찾아 체크하고, 'Y'는 해제
			$tabView.find("input[type='radio'][value='N']").prop("checked", true).parent().addClass("checked");
			$tabView.find("input[type='radio'][value='Y']").prop("checked", false).parent().removeClass("checked");
		},

		// 마케팅 동의 채널 하위 체크박스 관련
		mktChk : function(obj){
			var $obj = $(obj);
			var id = $obj.attr('id'); // 예: telAgree1
			var idx = id.replace(/[^0-9]/g, ''); // 숫자만 추출 (1 또는 2)
			
			// 현재 탭의 채널 체크박스 그룹 정의
			var channelIds = ['telAgree' + idx, 'smsAgree' + idx, 'emlAgree' + idx];
			var $channels = $('#' + channelIds.join(', #'));
			var $allChk = (idx === '1') ? $('#terms5') : $('#terms6'); // 전체 선택 체크박스
			
			var total = $channels.length;
			var checkedCount = $channels.filter(':checked').length;
			
			// 1. "전체 선택" 체크박스 상태 동기화
			var isAllChecked = (total === checkedCount);
			$allChk.prop('checked', isAllChecked);
			
			// UI 클래스 업데이트 (custom checkbox)
			if(isAllChecked) $allChk.parent().addClass('checked');
			else $allChk.parent().removeClass('checked');

			// 2. [비즈니스 로직] 모든 채널 해제 시 -> 마케팅 동의 전체 철회
			if (checkedCount === 0) {
				page.resetMarketing(idx);
			}
		},
		// 마케팅 동의 채널 체크박스 관련
		mktChkAll : function(obj){
			var $obj = $(obj);
			var isChecked = $obj.is(':checked');
			var id = $obj.attr('id'); // terms5 또는 terms6
			var idx = (id === 'terms5') ? '1' : '2';
			
			// 1. 하위 채널 체크박스 일괄 제어
			var channelIds = ['telAgree' + idx, 'smsAgree' + idx, 'emlAgree' + idx];
			var $channels = $('#' + channelIds.join(', #'));
			
			$channels.prop('checked', isChecked);
			
			// UI 클래스 업데이트
			if(isChecked) {
				$obj.parent().addClass('checked');
				$channels.parent().addClass('checked');
			} else {
				$obj.parent().removeClass('checked');
				$channels.parent().removeClass('checked');
				
				// 2. [비즈니스 로직] 해제 시 -> 마케팅 동의 전체 철회
				page.resetMarketing(idx);
			}
		}
		
	}
</script>
</head>
<body><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P6K4G4Z" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<form id="frm" method="post" action="WPYJV05"><input type="hidden" name="SESSION" value="fe3239cb-9600-4597-942f-41a380933683"></form>
	<div class="wrap ">
		<div class="container kbp_webp_065">
			<!-- 화면ID -->
			<!-- Header -->
			<div class="header">
				<h1>약관동의</h1>

				<button type="button" class="close closeWpyBtn">닫기</button>
			</div>
			<!-- //Header -->
			<div class="contents" style="height: 306px;">
				<!-- 본문 -->

				<ol class="depth-step">
					<li class="on"><span>1</span></li>
					<!--현재 step 활성화 class 'on'-->
					<li><span>2</span></li>
					<li><span>3</span></li>
				</ol>

				<p class="txt09 mt4">마케팅 정보 수신에 동의해주세요!</p>
				<!-- 2020-07-24 : 텍스트 수정 -->
				<!-- <p class="txt07 mt8">마케팅 수신 동의를 통해 KB국민카드의 상품정보, 이벤트 등 다양한 정보를 받아보실 수 있습니다. 원하지 않으실 경우 [다음]을 누르시면 가입절차가 계속 진행됩니다.</p> -->
				<p class="txt07 mt8">마케팅 수신 동의를 통해 KB국민카드의 상품정보, 이벤트 등 다양한 정보를 받아보실 수 있습니다.</p>

				<!-- 210617 탭구조 추가 -->
				<div class="tab-ui tabUI">
					<ul class="tab-list type01 tabType01">
						<li><a data-tabid="#tabView01" href="javascript: void(0);" class="active">요약동의서</a></li>
						<li><a data-tabid="#tabView02" href="javascript: void(0);">상세동의서</a></li>
					</ul>

					<div class="tab-contents">
						<div class="tab-item" id="tabView01">
							<div class="agree-terms">
								<ul>
									<li>
										<ul class="list">
                                            <li id="termsArea1">
                                                <label for="mktAgree1" class="f-chk type02 shoHidden">
                                                    <span class="stat">[선택] 개인(신용)정보 선택적 요약 동의서 </span>
                                                    <input id="mktAgree1" name="mktAgree1" type="checkbox">
                                                </label>
                                                <span><a href="" class="show-detail showDetail">[선택] 개인(신용)정보 선택적 요약 동의서 </a></span>
                                            </li>
                                            <li class="group-2depth">
                                                <ul>
                                                    <li class="tit-box">위 고유식별정보 제공에 동의하십니까?</li>
                                                    <li class="rdoGroup rdo-group">
                                                        <label for="brfMktUnqN" class="f-rdo checked"><input type="radio" id="brfMktUnqN" name="brfMktUnq" checked="" value="N">동의하지 않음</label>                                                 
                                                        <label for="brfMktUnqY" class="f-rdo "><input type="radio" id="brfMktUnqY" name="brfMktUnq" value="Y">동의함</label>                                        
                                                    </li>
                                                    <li class="tit-box">위 개인(신용)정보 수집 · 이용에 동의하십니까?</li>
                                                    <li class="rdoGroup rdo-group">
                                                        <label for="brfMktPsnN" class="f-rdo checked"><input type="radio" id="brfMktPsnN" name="brfMktPsn" checked="" value="N">동의하지 않음</label>                                               
                                                        <label for="brfMktPsnY" class="f-rdo "><input type="radio" id="brfMktPsnY" name="brfMktPsn" value="Y">동의함</label>                                        
                                                    </li>
                                                </ul>
                                            </li>
                                            <li id="termsArea3">
                                                <label for="mktAgree3" class="f-chk type02 shoHidden">
                                                    <span class="stat">[선택] 개인(신용)정보 선택적 요약 동의서_부수서비스</span>
                                                    <input id="mktAgree3" name="mktAgree3" type="checkbox">
                                                </label>
                                                <span><a href="" class="show-detail showDetail">[선택] 개인(신용)정보 선택적 요약 동의서_부수서비스</a></span>
                                            </li>
                                            <li class="group-2depth">
                                                <ul>
                                                    <li class="tit-box">위 고유식별정보 제공에 동의하십니까?</li>
                                                    <li class="rdoGroup rdo-group">
                                                        <label for="brfNaclMktUnqN" class="f-rdo checked"><input type="radio" id="brfNaclMktUnqN" name="brfNaclMktUnq" checked="" value="N">동의하지 않음</label>                                                 
                                                        <label for="brfNaclMktUnqY" class="f-rdo "><input type="radio" id="brfNaclMktUnqY" name="brfNaclMktUnq" value="Y">동의함</label>                                        
                                                    </li>
                                                    <li class="tit-box">위 개인(신용)정보 수집 · 이용에 동의하십니까?</li>
                                                    <li class="rdoGroup rdo-group">
                                                        <label for="brfNaclMktPsnN" class="f-rdo checked"><input type="radio" id="brfNaclMktPsnN" name="brfNaclMktPsn" checked="" value="N">동의하지 않음</label>                                               
                                                        <label for="brfNaclMktPsnY" class="f-rdo "><input type="radio" id="brfNaclMktPsnY" name="brfNaclMktPsn" value="Y">동의함</label>                                        
                                                    </li>
                                                </ul>
                                            </li>
                                            <li style="display: none;" class="hiddenItem" id="chnnArea1">
                                                <label for="terms5" class="f-chk type02 checkAllSub">
                                                    <span class="stat">마케팅 동의 채널 체크안됨</span>
                                                    <input id="terms5" name="terms5" type="checkbox" onclick="javascript:page.mktChkAll(this)">
                                                </label>
                                                <span><a href="javascript: void(0);" class="show-detail">마케팅 동의 채널</a></span>
                                                <ul class="list-2depth">
                                                    <li>
                                                        <label for="telAgree1" class="f-chk type02">
                                                            <span class="stat">전화 체크안됨</span>
                                                            <input id="telAgree1" name="telAgree1" type="checkbox" onclick="javascript:page.mktChk(this)"><span class="show-detail">전화</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label for="smsAgree1" class="f-chk type02">
                                                            <span class="stat">문자메시지 체크안됨</span>
                                                            <input id="smsAgree1" name="smsAgree1" type="checkbox" onclick="javascript:page.mktChk(this)"><span class="show-detail">문자메시지</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label for="emlAgree1" class="f-chk type02">
                                                            <span class="stat">이메일 체크안됨</span>
                                                            <input id="emlAgree1" name="emlAgree1" type="checkbox" onclick="javascript:page.mktChk(this)"><span class="show-detail">이메일</span>
                                                        </label>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
									</li>
								</ul>
							</div>
						</div>

						<div class="tab-item" id="tabView02">
							<div class="agree-terms">
								<ul>
									<li>
										<ul class="list">
                                            <li id="termsArea2">
                                                <label for="mktAgree2" class="f-chk type02 shoHidden">
                                                    <span class="stat">[선택] 개인(신용)정보 수집·이용 상세 동의서(상품서비스 안내 등) 체크안됨</span>
                                                    <input id="mktAgree2" name="mktAgree2" type="checkbox">
                                                </label>
                                                <span><a href="" class="show-detail showDetail"></a></span>
                                            </li>
                                            <li class="group-2depth">
                                                <ul>
                                                    <li class="tit-box">위 고유식별정보 제공에 동의하십니까?</li>
                                                    <li class="rdoGroup rdo-group">
                                                        <label for="dtlMktUnqN" class="f-rdo checked"><input type="radio" id="dtlMktUnqN" name="dtlMktUnq" checked="" value="N">동의하지 않음</label>                                                 
                                                        <label for="dtlMktUnqY" class="f-rdo "><input type="radio" id="dtlMktUnqY" name="dtlMktUnq" value="Y">동의함</label>                                        
                                                    </li>
                                                    <li class="tit-box">위 개인(신용)정보 수집 · 이용에 동의하십니까?</li>
                                                    <li class="rdoGroup rdo-group">
                                                        <label for="dtlMktPsnN" class="f-rdo checked"><input type="radio" id="dtlMktPsnN" name="dtlMktPsn" checked="" value="N">동의하지 않음</label>                                               
                                                        <label for="dtlMktPsnY" class="f-rdo "><input type="radio" id="dtlMktPsnY" name="dtlMktPsn" value="Y">동의함</label>                                        
                                                    </li>
                                                </ul>
                                            </li>
                                            <li id="termsArea4">
                                                <label for="mktAgree4" class="f-chk type02 shoHidden">
                                                    <span class="stat">[선택] 부수서비스 안내 등을 위한 수집·이용 상세 동의서 체크안됨</span>
                                                    <input id="mktAgree4" name="mktAgree4" type="checkbox">
                                                </label>
                                                <span><a href="" class="show-detail showDetail"></a></span>
                                            </li>
                                            <li class="group-2depth">
                                                <ul>
                                                    <li class="tit-box">위 고유식별정보 제공에 동의하십니까?</li>
                                                    <li class="rdoGroup rdo-group">
                                                        <label for="dtlNaclMktUnqN" class="f-rdo checked"><input type="radio" id="dtlNaclMktUnqN" name="dtlNaclMktUnq" checked="" value="N">동의하지 않음</label>                                                 
                                                        <label for="dtlNaclMktUnqY" class="f-rdo "><input type="radio" id="dtlNaclMktUnqY" name="dtlNaclMktUnq" value="Y">동의함</label>                                        
                                                    </li>
                                                    <li class="tit-box">위 개인(신용)정보 수집 · 이용에 동의하십니까?</li>
                                                    <li class="rdoGroup rdo-group">
                                                        <label for="dtlNaclMktPsnN" class="f-rdo checked"><input type="radio" id="dtlNaclMktPsnN" name="dtlNaclMktPsn" checked="" value="N">동의하지 않음</label>                                               
                                                        <label for="dtlNaclMktPsnY" class="f-rdo "><input type="radio" id="dtlNaclMktPsnY" name="dtlNaclMktPsn" value="Y">동의함</label>                                        
                                                    </li>
                                                </ul>
                                            </li>
                                            <li style="display: none;" class="hiddenItem" id="chnnArea2">
                                                <label for="terms6" class="f-chk type02 checkAllSub">
                                                    <span class="stat">마케팅 동의 채널 체크안됨</span>
                                                    <input id="terms6" name="terms6" type="checkbox" onclick="javascript:page.mktChkAll(this)">
                                                </label>
                                                <span><a href="javascript: void(0);" class="show-detail">마케팅 동의 채널</a></span>
                                                <ul class="list-2depth">
                                                    <li>
                                                        <label for="telAgree2" class="f-chk type02">
                                                            <span class="stat">전화 체크안됨</span>
                                                            <input id="telAgree2" name="telAgree2" type="checkbox" onclick="javascript:page.mktChk(this)"><span class="show-detail">전화</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label for="smsAgree2" class="f-chk type02">
                                                            <span class="stat">문자메시지 체크안됨</span>
                                                            <input id="smsAgree2" name="smsAgree2" type="checkbox" onclick="javascript:page.mktChk(this)"><span class="show-detail">문자메시지</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label for="emlAgree2" class="f-chk type02">
                                                            <span class="stat">이메일 체크안됨</span>
                                                            <input id="emlAgree2" name="emlAgree2" type="checkbox" onclick="javascript:page.mktChk(this)"><span class="show-detail">이메일</span>
                                                        </label>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
						</div>
					</div>
				</div>
				<!--// 210617 탭구조 추가 -->

				<!-- //본문 -->
			</div>

			<!-- Bottom area -->
			<div class="bottom-group">
				<div class="btn-group">
					<button type="button" class="btn-type type01" id="okBtn">
						<span>확인</span>
					</button>
				</div>
			</div>
			<!-- //Bottom area -->
		</div>
	</div>

	<!-- Layer popup -->
	<div class="l-dim"></div>
	<div class="l-pop" id="layer01" tabindex="0">
		<div class="l-pop-wrap">
			<div class="l-header">
				<h1 id="dtlTit">서비스 이용약관</h1>
				<button type="button" class="btn-type close" onclick="closeLayer('layer01')">닫기</button>
			</div>
			<div class="l-contents" tabindex="0">
				<p class="txt01" id="dtlCon"></p>
			</div>
			<div class="l-bottom-group">
				<div class="btn-group">
					<button type="button" class="btn-type type01" id="agreeBtn">
						<span>확인</span>
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- //Layer popup -->


</body></html>