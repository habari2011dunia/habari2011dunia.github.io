// クエリパラメータを取得する関数を定義
function getQueryParams () {
  var params = {}; // 戻り値
  // 頭の'?'を除き, セパレータ'&'で切り分ける
  var arr = document.location.search.substr(1).split("&");
  for (i = 0; i < arr.length; i++) {
    var pair = arr[i].split('='); // '='で分ける
    if (pair.length != 2) continue; // キー-値ペアになっていなければ無視
    var key = decodeURIComponent(pair[0]); // URLデコード
    var val = decodeURIComponent(pair[1]);
    params[key] = val; // 戻り値に追加
  }
  return params;
}

// 入力内容を変換
function typeset($result, input, wa) {
  // 入力内容をコピー
  $result.text(input);
  // 2つ以上の改行を<br>タグに置き換える
  var regex = new RegExp('\n\n+', "g");
  $result.html(
    $result.html().replace(regex, '<br>')
  );

  // MathJaxでコマンドを数式に変換
  MathJax.Hub.Queue(function() {
    if (typeof wa !== 'undefined' && wa) {
      MathJax.Hub.Typeset($result[0], addLinkToWolframAlpha);
    } else {
      MathJax.Hub.Typeset($result[0]);
    }
  });
}

// 式の横にWolframAlphaへのリンクを追加する
function addLinkToWolframAlpha() {
  var jax = MathJax.Hub.getJaxByInputType("math/tex");
  jax.forEach(function(e) {
    var cls = 'toWolframAlpha' + (e.HTMLCSS.display ? ' display' : '');
    var text = '&clubs;';
    var title = 'WolframAlphaへのリンク';
    var target = 'wolframalpha';
    var url = 'https://www.wolframalpha.com/input/?i=' + encodeURIComponent(e.originalText);
    var html =
      '<a href="'+url+'" target="'+target+'" title="'+title+'" class="'+cls+'">'+text+'</a>';
    $(html).insertAfter("#"+e.inputID+"-Frame");
  });
}
