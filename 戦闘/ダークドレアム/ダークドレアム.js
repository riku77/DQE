var menu_id = 0;
var maou_id = 0;


const
    E_NAME = 0
E_HP = 1,
    E_ATK = 2,
    E_DEF = 3,
    E_SPD = 4
E_action_num = 5;

//ドラクエ9の宝の地図の竜王lv1のステータス等を参考にしている
// HP,攻撃,防御,素早さの順番


const NAME = ["竜王", "破壊神シドー", "大魔王ゾーマ", "デスピサロ", "ミルドラース", "デスタムーア", "オルゴデミーラ", "暗黒神ラプソーン", "堕天使エルギオス", "冥王ネルゲル", "ウルノーガ", "エスターク", "ダークドレアム"]

E_num = 12


const HP = [7500, 7500, 8000, 4, 5, 6, 7, 8, 9, 10, 11, 12, 8250];
const ATK = [640, 650, 675, 4, 5, 6, 7, 8, 9, 10, 11, 12, 780];
const DEF = [640, 480, 570, 4, 5, 6, 7, 8, 9, 10, 11, 12, 610];
const SPD = [190, 260, 350, 4, 5, 6, 7, 8, 9, 10, 11, 12, 350];

enemy_status = [NAME[E_num], HP[E_num], ATK[E_num], DEF[E_num], SPD[E_num]];

//valueがちゃんと追加される
$('.st-enemyName').attr('value', enemy_status[E_NAME]);
$('.st-enemyHP').attr('value', enemy_status[E_HP]);
$('.st-enemyATK').attr('value', enemy_status[E_ATK]);
$('.st-enemyDEF').attr('value', enemy_status[E_DEF]);
$('.st-enemySPD').attr('value', enemy_status[E_SPD]);

//valueの値をセットすることで今後valueが変動するときにhtml要素の変動も同時にできるかも
$(".st-enemyName").html($('.st-enemyName').val());
$(".st-enemyHP").html($('.st-enemyHP').val());
$(".st-enemyATK").html($('.st-enemyATK').val());
$(".st-enemyDEF").html($('.st-enemyDEF').val());
$(".st-enemySPD").html($('.st-enemySPD').val());

//魔王切り替え関数＝魔王が生成されたときに.is-spawnのvalueをtrueにして攻撃可能にする
$('.is-spawn').attr('value', "true");

//こんな感じにすればタグのcssを適応しつつjavaScriptの変数を渡せる
document.getElementById('message').innerHTML = '<span class="message">' + NAME[E_num] + "が現れた" + '</span>'



player_status = ["kawahara", 999, 999, 999, 999, 999, 999]

const
    P_NAME = 0
P_LV = 1,
    P_HP = 2,
    P_MP = 3,
    P_ATK = 4,
    P_DEF = 5,
    P_INT = 6,
    P_SPD = 7

$(".st-playerName").attr('value', this.player_status[P_NAME]);
$(".st-playerLV").attr('value', this.player_status[P_LV]);
$(".st-playerHP").attr('value', this.player_status[P_HP]);
$(".st-playerMP").attr('value', this.player_status[P_MP]);
$(".st-playerATK").attr('value', this.player_status[P_ATK]);
$(".st-playerINT").attr('value', this.player_status[P_INT]);
$(".st-playerDEF").attr('value', this.player_status[P_DEF]);
$(".st-playerSPD").attr('value', this.player_status[P_SPD]);




/*バトル部分*/

//連戦させたいならmaou1.htmlとかのファイル名にして1の部分を勝利するごとに1加算してくプログラムにすれば連戦になるかな

//敵の最大体力
enemy_MAX_HP = $('.st-enemyHP').val()

//味方の最大体力
player_MAX_HP = $('.st-playerHP').val()

//ゲームオーバー画面に使うhtml要素
const endWindow = document.querySelector('.endWindow');



function dq9_damage_calc(either_Attacker) {

    /* 
        ドラクエ9,11のダメージ計算式は 基本ダメージ = （攻撃力/2-守備力/4） ± ダメージ幅 = ((攻撃力/2-守備力/4)÷16+1)
        仮に基本ダメージが50でダメージの幅が5だとすると実際に与えるダメージは45～55のいずれかになる
        ±なので50から5引いた45が最低ダメージ 50に5を足した55が最大ダメージとなる
        */

    //味方が攻撃するときの処理
    if (either_Attacker == "player") {

        const attack = parseInt($(".st-playerATK").val());
        const defence = parseInt($(".st-enemyDEF").val());

        if (typeof attack == "number" && typeof defence == "number") {

            // ダメージの基本値
            damage_basic_value = (attack / 2) - (defence / 4)
                //ダメージの幅、小数点は四捨五入する
            damage_ran = Math.round(damage_basic_value / 16 + 1)

            if (0 >= damage_basic_value) {
                //ダメージが0以下のときは1を返す
                console.log("ダメージ計算式" + 1);
                document.getElementById('message').innerHTML = '<span class="message">' + $(".st-playerName").val() + "は" + $(".st-enemyName").val() + "に" + "<br>" + "1ダメージを与えた" + '</span>'
                $('.st-enemyHP').attr('value', $('.st-enemyHP').val() - 1);
                $(".st-enemyHP").html(Math.trunc($('.st-enemyHP').val()));
                return 1
            } else {
                maxDamage = damage_basic_value + damage_ran
                minDamage = damage_basic_value - damage_ran
                    //最大値～最小値の範囲の乱数を返す
                console.log("基本ダメージ:" + damage_basic_value);
                console.log("ダメージ幅:" + damage_ran);
                console.log("ダメージ計算式" + Math.trunc(Math.random() * ((maxDamage + 1) - minDamage) + minDamage));

                document.getElementById('message').innerHTML = '<span class="message">' + $(".st-playerName").val() + "は" + $(".st-enemyName").val() + "に" + "<br>" + Math.trunc(Math.random() * ((maxDamage + 1) - minDamage) + minDamage) + "ダメージを与えた" + '</span>'

                //playerが敵の体力を減らす処理
                $('.st-enemyHP').attr('value', $('.st-enemyHP').val() - Math.trunc(Math.random() * ((maxDamage + 1) - minDamage) + minDamage));
                //math.truncを使うことで小数点を表示しない
                $(".st-enemyHP").html(Math.trunc($('.st-enemyHP').val()));
                return Math.trunc(Math.random() * (maxDamage - minDamage) + minDamage);
            }
        }
    }
    //敵が攻撃するときの処理
    else if (either_Attacker == "enemy") {

        const attack = parseInt($(".st-enemyATK").val());
        const defence = parseInt($(".st-playerDEF").val());

        if (typeof attack == "number" && typeof defence == "number") {

            // ダメージの基本値
            damage_basic_value = (attack / 2) - (defence / 4)
                //ダメージの幅、小数点は四捨五入する
            damage_ran = Math.round(damage_basic_value / 16 + 1)

            if (0 >= damage_basic_value) {
                //ダメージが0以下のときは1を返す
                console.log("ダメージ計算式" + 1);
                document.getElementById('message').innerHTML = '<span class="message">' + $(".st-enemyName").val() + "は" + $(".st-playerName").val() + "に" + "<br>" + "1ダメージを与えた" + '</span>'
                $('.st-playerHP').attr('value', $('.st-playerHP').val() - 1);
                $(".st-playerHP").html(Math.trunc($('.st-playerHP').val()));
                return 1
            } else {
                maxDamage = damage_basic_value + damage_ran
                minDamage = damage_basic_value - damage_ran
                    //最大値～最小値の範囲の乱数を返す
                console.log("基本ダメージ:" + damage_basic_value);
                console.log("ダメージ幅:" + damage_ran);
                console.log("ダメージ計算式" + Math.trunc(Math.random() * ((maxDamage + 1) - minDamage) + minDamage));

                document.getElementById('message').innerHTML = '<span class="message">' + $(".st-enemyName").val() + "は" + $(".st-playerName").val() + "に" + "<br>" + Math.trunc(Math.random() * ((maxDamage + 1) - minDamage) + minDamage) + "ダメージを与えた" + '</span>'

                //enemyがplayerの体力を減らす処理
                $('.st-playerHP').attr('value', $('.st-playerHP').val() - Math.trunc(Math.random() * ((maxDamage + 1) - minDamage) + minDamage));
                //math.truncを使うことで小数点を表示しない
                $(".st-playerHP").html(Math.trunc($('.st-playerHP').val()));
                return Math.trunc(Math.random() * (maxDamage - minDamage) + minDamage);
            }
        }


    } else {
        return console.log("引数エラー")
    }

}


//プレイヤーが攻撃したら敵も攻撃する処理が完成
function AttackTester() {

    //  st-playerATK = プレイヤーの攻撃力 st-enemyDEF= 敵の防御力
    //メソッドの中に置いてないと意図しない処理になる


    //とりあえずHPを減らす処理はできてる

    //この条件を満たしていないなら敵がいないから攻撃はできない
    //仮に敵がいるのに条件を満たさない場合はどこかが設計ミスしているので見直し
    if ($('.is-spawn').val() == "true") {
        //攻撃処理-player
        dq9_damage_calc("player")

        if ($('.st-enemyHP').val() >= 0) {
            console.log("最大体力:" + enemy_MAX_HP)
            console.log("現在の体力:" + $('.st-enemyHP').val())
        } else {
            console.log("魔王を倒した")
            $('.st-enemyHP').attr('value', 0);
            $(".st-enemyHP").html(0);

            console.log("勝利！")
            $('#all_interference').detach();

            //竜王htmlだとこれもないとなんでか消えない
            $('.comment-list').detach();
            $('.game_enemy').detach();

            //こんな感じですることでクリア画面とゲームオーバー画面の違いを作ることができる
            $('.img-center').html('<img src="../../img/クリア.jpg" width=230 height=230 border="1">' + '<div>魔王を倒した！</div>');
            $('.btnLi').html('<li><a href="../ダークドレアム/ダークドレアム.html">次のボスへ</a></li><li><a href="../../index.html">TOPへ戻る</a></li>')
            endWindow.classList.add("show");

        }




        //攻撃処理-enemy
        dq9_damage_calc("enemy")
        if ($('.st-playerHP').val() >= 0) {
            console.log("最大体力:" + player_MAX_HP)
            console.log("現在の体力:" + $('.st-playerHP').val())
        } else {
            console.log("パーティは全滅した")
            $('.st-playerHP').attr('value', 0);
            $(".st-playerHP").html(0);

            console.log("敗北！")
            $('#all_interference').detach();
            $('.comment-list').detach();
            $('.game_enemy').detach();

            $('.img-center').html('<img src="../../img/ゲームオーバー.jpg" width=230 height=230 border="1">' + '<div>勇者は負けてしまった！' + "<br>" + "ステータスを変更することができたら勝てるかもしれない" + '</div>');
            $('.btnLi').html('<li><a href="ダークドレアム.html">再戦</a></li><li><a href="../../index.html">TOPへ戻る</a></li>')
            endWindow.classList.add("show");

        }


        //敵がいないときの処理
    } else {
        console.log("敵がいません")
        document.getElementById('message').innerHTML = '<span class="message">敵がいません</span>'
    }



    if ($(".st-enemyHP").val() <= 1000) {
        //ダークドレアムはシンプルに強いイメージ
        if (Number($('.st-playerHP').val()) <= 0) {
            console.log("敗北！")
            $('#all_interference').detach();
            $('.game_enemy').detach();
            $('.img-center').html('<img src="../../img/ゲームオーバー.jpg" width=230 height=230 border="1">' + '<div>勇者は負けてしまった！' + "<br>" + "ステータスを変更することができたら勝てるかもしれない" + '</div>');
            endWindow.classList.add("show");
        }
    }



}


//ダークドレアムは普通にやるだけじゃ回復が追い付かない
function life_heel() {

    if (Number($('.st-playerHP').val()) <= 998) {
        $(".st-playerHP").attr('value', Number($('.st-playerHP').val()) + 110);
        $(".st-playerHP").html($(".st-playerHP").val());
        //体力が999以上回復することを許さない
        if (Number($('.st-playerHP').val()) > 999) {
            $(".st-playerHP").attr('value', Number(999));
            $(".st-playerHP").html($(".st-playerHP").val());
        }
        dq9_damage_calc("enemy")
            //体力が999以上のときはそもそも回復処理させない
    } else {
        $(".st-playerHP").attr('value', Number(999));
        $(".st-playerHP").html($(".st-playerHP").val());
        document.getElementById('message').innerHTML = '<span class="message">最大HPは999です</span>';
    }
    if (Number($('.st-playerHP').val()) <= 0) {
        console.log("敗北！")
        $('#all_interference').detach();
        $('.game_enemy').detach();
        $('.img-center').html('<img src="../../img/ゲームオーバー.jpg" width=230 height=230 border="1">' + '<div>勇者は負けてしまった！' + "<br>" + "ステータスを変更することができたら勝てるかもしれない" + '</div>');


        endWindow.classList.add("show");
    }



}



const keyboard_operation = {
    data() {
        return {
            key: '',
            keyCode: null
        }
    },
    mounted() {
        document.addEventListener('keydown', this.onKeyDown)
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.onKeyDown)
    },
    unmounted() {
        //unmoutedは画面が閉じた時点で発動する。のでキーダウンをリムーブすると裏で動かなくなる
        document.removeEventListener('keydown', this.onKeyDown)
        console.log('>>> unmounted');
    },

    methods: {
        onKeyDown(event) {

            switch (event.keyCode) {
                case 37: //カーソルキーの左
                    document.getElementById("game_control").value = "←";
                    break;
                case 38: //カーソルキーの上
                    document.getElementById("game_control").value = "↑";
                    if (menu_id <= 1) {
                        //ここが最大コマンド数（後で定数じゃなくて変数にした方がいいかも）
                        activeMenu(6);
                    } else {
                        activeMenu(menu_id - 1);
                    }
                    break;
                case 39: //カーソルキーの右
                    document.getElementById("game_control").value = "→";
                    break;
                case 40: //カーソルキーの下
                    document.getElementById("game_control").value = "↓";
                    //ここの5も最大コマンド数
                    if (menu_id >= 6) {
                        activeMenu(1);
                    } else {
                        activeMenu(menu_id + 1);
                    }
                    break;
                case 13: //エンターキー
                    doCommand(menu_id);

                    break;
                default: //その他の場合はキーコードを表示
                    document.getElementById("game_control").value = "キーコード:" + event.keyCode;
                    break;

            }


        }
    },

}

Vue.createApp(keyboard_operation).mount('#all_interference')



//戦う魔王一覧の画面でキーボード操作するためのコード
const maou_keyboard_operation = {
    data() {
        return {
            key: '',
            keyCode: null
        }
    },
    mounted() {
        document.addEventListener('keydown', this.onKeyDown)
            //Vue.maou_keyboard_operation.unmount();

    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.onKeyDown)
        console.log('>>> unmounted');
    },
    unmounted() {
        //unmoutedは画面が閉じた時点で発動する。これだと複数開くとその分カーソルの動く回数が増えていくのがなくなる
        document.removeEventListener('keydown', this.onKeyDown)
        console.log('>>> unmounted');
    },


    methods: {
        onKeyDown(event) {

            switch (event.keyCode) {
                case 37: //カーソルキーの左
                    document.getElementById("game_control2").value = "←";
                    break;
                case 38: //カーソルキーの上
                    document.getElementById("game_control2").value = "↑";
                    if (maou_id <= 1) {
                        //ここが最大コマンド数（後で定数じゃなくて変数にした方がいいかも）
                        maou_Selector(14);
                    } else {
                        maou_Selector(maou_id - 1);
                    }
                    break;
                case 39: //カーソルキーの右
                    document.getElementById("game_control2").value = "→";
                    break;
                case 40: //カーソルキーの下
                    document.getElementById("game_control2").value = "↓";
                    //ここの5も最大コマンド数
                    if (maou_id >= 14) {
                        maou_Selector(1);
                    } else {
                        maou_Selector(maou_id + 1);
                    }
                    break;
                case 13: //エンターキー
                    maou_Battle(maou_id);

                    break;
                default: //その他の場合はキーコードを表示
                    document.getElementById("game_control2").value = "キーコード:" + event.keyCode;
                    break;

            }


        }
    },

}



function activeMenu_message_view(id) {

    switch (id) {
        case 1:
            document.getElementById('message').innerHTML = '<span class="message">たたかう</span>';
            break;
        case 2:
            document.getElementById('message').innerHTML = '<span class="message">とくぎ</span>';
            break;
        case 3:
            document.getElementById('message').innerHTML = '<span class="message">かいふく</span>';
            break;
        case 4:
            document.getElementById('message').innerHTML = '<span class="message"ぼうぎょ</span>';
            break;
        case 5:
            document.getElementById('message').innerHTML = '<span class="message"どうぐ</span>';
            break;
        case 6:
            document.getElementById('message').innerHTML = 'にげる</span>';
            break;

        default:
            break;
    }


}


function activeMenu(id) {
    //menu_idは一番上で定義してる
    if (menu_id == id) {
        //前回と同じメニューが選ばれた場合はコマンドを実行
        doCommand(id);
    } else {
        if (menu_id != 0) {
            //現在のメニューのカーソルを消す
            document.getElementById('menu' + menu_id).className = 'menu';
        }
        //今回選ばれたメニューにカーソルを表示
        //カーソルの定義はmenu menu-activeでやっている
        document.getElementById('menu' + id).className = 'menu menu-active';
        menu_id = id;
        if (menu_id == id) {
            activeMenu_message_view(menu_id);
        }

    }
}






//コマンドの実行
function doCommand(command_id) {
    document.getElementById("game_control").value = "コマンド番号:" + command_id;
    switch (command_id) {
        case 1: //たたかう
            //ドラクエではモンスターは基本的に回避しないから率の設定はいらんかな。
            AttackTester();
            break;
        case 2: //とくぎ
            document.getElementById('message').innerHTML = '<span class="message">とくぎ</span>';
            break;
        case 3: //かいふく
            document.getElementById('message').innerHTML = '<span class="message">かいふく</span>';
            life_heel()
            break;
        case 4: //ぼうぎょ
            document.getElementById('message').innerHTML = '<span class="message">ああああは みをまもっている！</span>';
            break;
        case 5: //どうぐ
            document.getElementById('message').innerHTML = '<span class="message">しかし なにも持っていなかった</span>';
            break;
            break;
        case 6: //にげる
            javascript: window.history.back(-1);
            return false;
        default:
            break;
    }
}


// とりあえず実装できてる
//戦う魔王を選択するためのウィンドウ
//1.魔王選択を押したときになんでか防御の方に処理がいってる （解決済み）
//2.キー操作した後にクリック操作するとおかしくなる現象はここが原因の可能性もある
function maou_window_view() {
    //表示するウィンドウの指定
    const nav = document.querySelector(".strategy-status");
    document.addEventListener("click", (e) => {
        //#menu2  = 防御コマンド
        //処理するボタンを変えるときはここも書き換えないといけない
        //指定したクラスやIDのとこをClickしたを条件に指定
        if (e.target.closest("#menu2")) {
            document.getElementById('message').innerHTML = '<span class="message">メニューを開きました</span>';
            nav.classList.contains("active") ? nav.classList.remove("active") : nav.classList.add("active");
        }
        //maou-listをClickしたときの処理は何もしないことでボタンを押しても画面を閉じない 
        else if (e.target.closest(".maou-list")) {

            //それ以外をクリックすると表示したウィンドウをリムーブする
        } else {
            nav.classList.remove("active");
        }
    });
}





//これ結局使ってないな後で消すかも
function senntaku_window_view() {
    //表示するウィンドウの指定
    const nav = document.querySelector("#senntakusi");
    document.addEventListener("click", (e) => {
        //#menu2  = 防御コマンド
        //処理するボタンを変えるときはここも書き換えないといけない
        //指定したクラスやIDのとこをClickしたを条件に指定
        if (e.target.closest("#maou14")) {
            document.getElementById('message').innerHTML = '<span class="message">メニューを開きました</span>';
            nav.classList.contains("active") ? nav.classList.remove("active") : nav.classList.add("active");
        }
        //maou-listをClickしたときの処理は何もしないことでボタンを押しても画面を閉じない 
        else if (e.target.closest(".maou-list")) {
            //それ以外をクリックすると表示したウィンドウをリムーブする
        } else {
            nav.classList.remove("active");
        }
    });
}

// 選んだコマンドによって表示するmessageを変更する
function message_view(id) {

    switch (id) {
        case 1:

            document.getElementById('message').innerHTML = '<span class="message">竜王と戦いますか？<br>戦うならダブルクリック</span>';
            break;
        case 2:
            document.getElementById('message').innerHTML = '<span class="message">破壊神シドーと戦いますか？<br>戦うならダブルクリック</span>';
            break;
        case 3:
            document.getElementById('message').innerHTML = '<span class="message">大魔王ゾーマと戦いますか？<br>戦うならダブルクリック</span>';
            break;
        case 4:
            document.getElementById('message').innerHTML = '<span class="message">デスピサロと戦いますか？<br>戦うならダブルクリック</span>';
            break;
        case 5:
            document.getElementById('message').innerHTML = '<span class="message">ミルドラースと戦いますか？<br>戦うならダブルクリック</span>';
            break;
        case 6:
            document.getElementById('message').innerHTML = '<span class="message">デスタムーアと戦いますか？<br>戦うならダブルクリック</span>';
            break;
        case 7:
            document.getElementById('message').innerHTML = '<span class="message">オルゴデミーラと戦いますか？<br>戦うならダブルクリック</span>';
            break;
        case 8:
            document.getElementById('message').innerHTML = '<span class="message">ラプソーンと戦いますか？<br>戦うならダブルクリック</span>';
            break;
        case 9:
            document.getElementById('message').innerHTML = '<span class="message">堕天使エルギオスと戦いますか？<br>戦うならダブルクリック</span>';
            break;
        case 10:
            document.getElementById('message').innerHTML = '<span class="message">冥王ネルゲルと戦いますか？<br>戦うならダブルクリック</span>';
            break;
        case 11:
            document.getElementById('message').innerHTML = '<span class="message">ウルノーガと戦いますか？<br>戦うならダブルクリック</span>';
            break;
        case 12:
            document.getElementById('message').innerHTML = '<span class="message">エスタークと戦いますか？<br>戦うならダブルクリック</span>';
            break;
        case 13:
            document.getElementById('message').innerHTML = '<span class="message">ダークドレアと戦いますか？<br>戦うならダブルクリック</span>';
            break;
        case 14:
            document.getElementById('message').innerHTML = '<span class="message">戻りますか？<br>戻るならダブルクリック</span>';
            break;
        default:
            break;
    }

}

//画像表示場所の画像を変更する
function enemy_img_view(id) {

    switch (id) {
        case 1:
            document.getElementById('enemy_img').innerHTML = '<img src="img/竜王3.jpg" width=230 height=230 border="1">'

            break;
        case 2:
            document.getElementById('enemy_img').innerHTML = '<img src="img/シドー3.jpg" width=230 height=230 border="1">'
            break;
        case 3:
            document.getElementById('enemy_img').innerHTML = '<img src="img/ゾーマ3.jpg" width=230 height=230 border="1">'

            break;
        case 4:
            document.getElementById('enemy_img').innerHTML = '<img src="img/デスピサロ3.jpg" width=230 height=230 border="1">'
            break;
        case 5:
            document.getElementById('enemy_img').innerHTML = '<img src="img/ミルドラース3.jpg" width=230 height=230 border="1">'

            break;
        case 6:
            document.getElementById('enemy_img').innerHTML = '<img src="img/デスタムーア3.jpg" width=230 height=230 border="1">'

            break;
        case 7:
            document.getElementById('enemy_img').innerHTML = '<img src="img/オルゴデミーラ3.jpg" width=230 height=230 border="1">'

            break;
        case 8:
            document.getElementById('enemy_img').innerHTML = '<img src="img/ラプソーン3.jpg" width=230 height=230 border="1">'

            break;
        case 9:
            document.getElementById('enemy_img').innerHTML = '<img src="img/エルギオス3.jpg" width=230 height=230 border="1">'

            break;
        case 10:
            document.getElementById('enemy_img').innerHTML = '<img src="img/ネルゲル3.jpg" width=230 height=230 border="1">'

            break;
        case 11:
            document.getElementById('enemy_img').innerHTML = '<img src="img/ウルノーガ3.jpg" width=230 height=230 border="1">'

            break;
        case 12:
            document.getElementById('enemy_img').innerHTML = '<img src="img/エスターク2.jpg" width=230 height=230 border="1">'

            break;
        case 13:
            document.getElementById('enemy_img').innerHTML = '<img src="img/ダークドレアム3.jpg" width=230 height=230 border="1">'

            break;
        case 14:
            document.getElementById('enemy_img').innerHTML = '<img src="img/歴代魔王ドット.png" width=230 height=230 border="1">'
            break;
        default:
            break;
    }

}



function maou_Selector(id) {


    //前回と同じメニューが選ばれた場合はコマンドを実行
    if (maou_id == id) {
        maou_Battle(id);
    } else {
        if (maou_id != 0) {
            //現在のメニューのカーソルを消す
            document.getElementById('maou' + maou_id).className = 'menu';
        }
        //今回選ばれたメニューにカーソルを表示
        //カーソルの定義はmenu menu-activeでやっている
        document.getElementById('maou' + id).className = 'menu menu-active';
        maou_id = id;
        //選んだメニューの説明を表示
        if (maou_id == id) {
            enemy_img_view(maou_id);
            message_view(maou_id);
        }

    }
}




function maou_Battle(Battle_id) {

    document.getElementById("game_control2").value = "魔王戦:" + Battle_id;
    switch (Battle_id) {
        case 1:
            window.location.href = '戦闘/竜王/竜王.html';
            break;
        case 2:
            window.location.href = '戦闘/シドー/シドー.html';
            break;
        case 3: //どうぐ

            break;
        case 4: //にげる
            break;
        case 14: //一回開いたメニューを閉じる
            //最悪これでページ更新して解決するか？
            //location.reload();
            document.querySelector(".strategy-status").classList.remove("active");
            document.getElementById('message').innerHTML = '<span class="message">メニューを閉じました</span>';
            break;
        default:
            break;
    }
}