$(document).ready(function () {
  // alert("呼び出し成功");
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAfuxZzELbCkaN-KJom_5wHzHUU5Qkd0ik",
    authDomain: "camp07-1f701.firebaseapp.com",
    databaseURL: "https://camp07-1f701.firebaseio.com",
    projectId: "camp07-1f701",
    storageBucket: "camp07-1f701.appspot.com",
    messagingSenderId: "1007228154487",
    appId: "1:1007228154487:web:9ef6fb8c62186a6a6f8c72",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //firebaseのデーターベース（保存させる場所）を使いますよと言うjsのコードを貼り付ける
  // xxxxxスクリプトを貼り付ける
  const newPostRef = firebase.database().ref();

  // 送信関数
  function send() {
    // 入力内容をfirebaseに送信
    newPostRef.push({
      date: $("#date").val(),
      weight_input: $("#weight_input").val(),
      exercise_discipline: $("#exercise_discipline").val(),
      exercise_minute: $("#exercise_minute").val(),
    });
    // 文字を空にする
    $("#date").val("");
    $("#weight_input").val("");
    $("#exercise_discipline").val("");
    $("#exercise_minute").val("");
  }

  // 送信処理１
  $("#submit_btn").on("click", function () {
    send();
  });

  // 送信処理２
  $("#submit_btn").on("keydown", function (e) {
    if (e.keyCode === 13) {
      send();
    }
  });

  // 一括削除ボタン
  newPostRef.on("child_added", function (data) {
    let v = data.val(); //データ取得
    let k = data.key; //ユニークKEY取得

    $("#delete_btn").on("click", function () {
      firebase
        .database()
        .ref(k)
        .remove()
        .then(function () {});
    });
  });

  let key_id; //←森田先生のコードを参考にさせていただきました。

  // 受信処理（weight.html）
  newPostRef.on("child_added", function (data) {
    let v = data.val(); //データ取得
    key_id = data.key; //ユニークKEY取得

    console.log(key_id, "key"); //これが固有のIDになるのでこれを元に更新をする
    console.log(v, "受信"); //vの変数に入っているオブジェクトを全てみる

    let str = `
    <tr class=${key_id}>
    <td class="date_fix">${v.date}</td>
    <td class="weight_fix">${v.weight_input}</td>
    </tr>`;
    // データをhtmlに埋め込み
    $("#output_weight").append(str);
  });

  // グラフ化（実現できず）↓
  // let chart_date = [];
  // let chart_weight = [];
  // console.log(chart_date);
  // console.log(chart_weight);

  // newPostRef.on("child_added", function (data) {
  //   let v = data.val();
  //   let k = data.key;

  //   chart_date.push(v.month + "月" + v.day + "日");
  //   chart_weight.push(Number(v.weight_input));
  // });

  // let ctx = $("#weightChart");
  // let weightChart = new Chart(ctx, {
  //   type: "line",
  //   data: {
  //     labels: [
  //       "1日",
  //       "2日",
  //       "3日",
  //       "4日",
  //       "5日",
  //       "6日",
  //       "7日",
  //       "8日",
  //       "9日",
  //       "10日",
  //       "11日",
  //       "12日",
  //       "13日",
  //       "14日",
  //       "15日",
  //       "16日",
  //       "17日",
  //       "18日",
  //       "19日",
  //       "20日",
  //       "21日",
  //       "22日",
  //       "23日",
  //       "24日",
  //       "25日",
  //       "26日",
  //       "27日",
  //       "28日",
  //       "29日",
  //       "30日",
  //       "31日",
  //     ],
  //     datasets: [
  //       {
  //         label: "体重の推移(kg）",
  //         data: chart_weight,
  //         borderColor: "rgba(255,110,0,1)",
  //         backgroundColor: "rgba(0,0,0,0)",
  //       },
  //     ],
  //   },
  //   options: {
  //     title: {
  //       display: true,
  //       text: "",
  //     },
  //     scales: {
  //       yAxes: [
  //         {
  //           ticks: {
  //             suggestedMax: 80,
  //             suggestedMin: 45,
  //             stepSize: 5,
  //             callback: function (value, index, values) {
  //               return value + "kg";
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  // });
  // グラフ化（実現できず）↑

  // 受信処理（exercise.html）
  newPostRef.on("child_added", function (data) {
    let v = data.val(); //データ取得
    let k = data.key; //ユニークKEY取得

    let exercise_discipline;
    let kcal_per_minute;

    switch (Number(v.exercise_discipline)) {
      case 1:
        exercise_discipline = "ウォーキング";
        kcal_per_minute = 1.67;
        break;
      case 2:
        exercise_discipline = "ランニング";
        kcal_per_minute = 4.5;
        break;
      case 3:
        exercise_discipline = "スイミング";
        kcal_per_minute = 4.17;
        break;
      case 4:
        exercise_discipline = "サイクリング";
        kcal_per_minute = 4.0;
        break;
    }

    let str = `
    <tr class=${key_id}>
    <td>${v.date}</td>
    <td>${exercise_discipline}</td>
    <td>${v.exercise_minute}</td>
    <td>${Math.floor(v.exercise_minute * kcal_per_minute)}</td>
    </tr>`;
    // データをhtmlに埋め込み
    $("#output_exercise").append(str);
  });

  // $(document).ready閉じタグ
});
