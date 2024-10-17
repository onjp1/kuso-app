<!DOCTYPE html>
<html>
  <head>
    <title>10にするやつ</title>
  </head>
  <body>

    <h1>10にするやつ</h1>
    <p>並べ替えたり計算して10にする</p>
    <p>例: 1234　の場合の回答例　2*3+4/1=10</p>

    <label for="name">数字 (5桁まで):</label>
    <input type="number" id="inputNumber" name="inputNumber" required minlength="1" maxlength="5" size="10" /><br><br>

    <label for="name">お前の回答:</label>
    <input type="text" id="userAnswer" name="userAnswer" maxlength="255" size="30" /><br><br>

    <input id="submitBtn" type="button" value="回答を送信" /><br><br>

    <label for="name">答えの数:</label>
    <input type="text" id="userAnswerNum" name="userAnswerNum" maxlength="255" size="5" readonly disabled/><br><br>

    <input id="open" type="button" value="答えを見る" /><br><br>

    <label for="name">答え:</label><br>
    <textarea name="answer" cols="30" rows="5" readonly disabled style="resize: none;"></textarea>

    <script src="10nisuru.js"></script>
  </body>
</html> 
