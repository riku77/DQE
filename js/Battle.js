//ドラクエ9の宝の地図の竜王lv1のステータス等を参考にしている
//ドラクエ9の魔王に賢さとMPは設定されていない
//ステータス参考サイト:https://game8.jp/dq9/308303
//                  http://dq9.ek-pro.com/w/%25A5%25B7%25A5%25C9%25A1%25BC.html
//                  https://dragonquest9.com/?%E3%82%B7%E3%83%89%E3%83%BC


/*敵のデータ*/


const
    E_NAME = 0
E_HP = 1,
    E_ATK = 2,
    E_DEF = 3,
    E_SPD = 4
E_action_num = 5;


//エネミーセレクト兼テスト用
function enemy_selector() {
    const NAME = ["竜王", "破壊神シドー", "大魔王ゾーマ", "デスピサロ", "ミルドラース", "デスタムーア", "オルゴデミーラ", "暗黒神ラプソーン", "堕天使エルギオス", "冥王ネルゲル", "ウルノーガ", "エスターク", "ダークドレアム"]

    E_num = $('[name=enemyList]').val()


    const HP = [7500, 7500, 8000, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const ATK = [640, 650, 675, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const DEF = [640, 480, 570, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const SPD = [190, 260, 350, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

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
    document.getElementById('message').innerHTML = '<span class="message">' + NAME[E_num] + "が選択されました" + '</span>'
    return E_num

}

function enemy_data() {



    //余裕あるなら弱点属性も入れていいかも（スキルとか呪文の追加時にでも）

    // 敵の名前,HP,攻撃,防御,素早さの順番

    const E_num = $('[name=enemyList]').val()
    const NAME = ["竜王", "破壊神シドー", "大魔王ゾーマ", "デスピサロ", "ミルドラース", "デスタムーア", "オルゴデミーラ", "暗黒神ラプソーン", "堕天使エルギオス", "冥王ネルゲル", "ウルノーガ", "エスターク", "ダークドレアム"]
    const HP = [7500, 7500, 8000, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const ATK = [640, 650, 675, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const DEF = [640, 480, 570, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    const SPD = [190, 260, 350, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    // 敵の行動回数
    //1か2を取得する乱数
    ran1 = Math.floor(Math.random() * 2 + 1)
    const enemy_attack = [ran1, ran1, 2]

    enemy_status = [NAME[E_num], HP[E_num], ATK[E_num], DEF[E_num], SPD[E_num], enemy_attack[E_num]];

    //HPだけ取得したいならenemy_status[HP]とかHP[E_num]みたいに指定すればいい
    console.log("敵ステータス:" + enemy_status)

    /*
    データをhtmlのdiv要素とかに入れて（敵のやつは見えなくする）
    その入れたデータのvalue(HP)をダメージ与えるごとに減らしていくって感じで勝敗判定できそうかな
    */

    $(".st-enemyName").html(enemy_status[E_NAME]);
    $(".st-enemyHP").html(enemy_status[E_HP]);
    $(".st-enemyATK").html(enemy_status[E_ATK]);
    $(".st-enemyDEF").html(enemy_status[E_DEF]);





    return enemy_status

}




/*味方のデータ*/

// 名前,レベル,HP,MP,攻撃,賢さ,防御,素早さの順番
//player_status = ["HP" + 100, "MP" + 50, "攻撃" + 25, "賢さ" + 25, "防御" + 25, "素早さ" + 25]
const
    P_NAME = 0
P_LV = 1,
    P_HP = 2,
    P_MP = 3,
    P_ATK = 4,
    P_DEF = 5,
    P_INT = 6,
    P_SPD = 7



class Player {

    constructor(player_status, player_skill, player_item) {

        this.player_status = player_status
        this.player_skill = player_skill
        this.player_item = player_item

        //ここにstatus_setの処理持ってきてもいいかな


    }

    //クラスの中で関数を定義する場合はfunctionは不要


    status_set() {
        //ちゃんと機能している
        //各ステータス要素のとこをCreateしたプレイヤーインスタンスの要素に変更する
        //このデータを元にHPを減らしたりして勝敗の判定を行う
        $(".st-playerName").attr('value', this.player_status[P_NAME]);
        $(".st-playerLV").attr('value', this.player_status[P_LV]);
        $(".st-playerHP").attr('value', this.player_status[P_HP]);
        $(".st-playerMP").attr('value', this.player_status[P_MP]);
        $(".st-playerATK").attr('value', this.player_status[P_ATK]);
        $(".st-playerINT").attr('value', this.player_status[P_INT]);
        $(".st-playerDEF").attr('value', this.player_status[P_DEF]);
        $(".st-playerSPD").attr('value', this.player_status[P_SPD]);


        $(".st-playerName").html($(".st-playerName").val());
        $(".st-playerLV").html($(".st-playerLV").val());
        $(".st-playerHP").html($(".st-playerHP").val());
        $(".st-playerMP").html($(".st-playerMP").val());
        $(".st-playerATK").html($(".st-playerATK").val());
        $(".st-playerINT").html($(".st-playerINT").val());
        $(".st-playerDEF").html($(".st-playerDEF").val());
        $(".st-playerSPD").html($(".st-playerSPD").val());


    }

    status_get() {
        console.log("ステータス: " + this.player_status);
        return this.player_status;
    }



}



// プレイヤーの切り替えに使用
//ちゃんと機能している
function player_selector() {

    P_num = $('[name=playerList]').val()
    document.getElementById('message').innerHTML = '<span class="message">' + "プレイヤー" + (Number(P_num) + 1) + "が選択されました" + '</span>'
    return P_num
}


// プレイヤーの作成に使用
function Player_Create(Player＿num) {





    /*
    
    ＃ 変数等説明（2022/06/16時点）
    
    player_status // 実際の戦闘処理に使う値を格納している配列
    status_set() // ステータスメニューに現時点の最新のステータスを表示させるためのやつ

    ＃ 関数Plyer_Createの流れ

    ステータスを決める
    ↓
    アイテムやスキルを決める
    ↓
    プレイヤーの人数を判定する
    ↓
    作成

    */



    //  Player_Create関数スコープに置けば関数を実行する毎に代入をするわけだから常に最新のデータになる
    //ステータスの制限 先頭に0が入力されていたら無効,999を超えていたら無効
    //charAt()の数値は配列の添え字と同じと考えていい1にしたら二桁目に0を入力したら無効
    //javaScriptは右辺から先に判定されて満たさないならその時点で終了

    //このままだとHPだけしか0にしてないから後で全ステータスに干渉できるようにする
    if ($('[name=debug]:checked').val() == 'debug-false' && ($("#yuusya1_hp").val().charAt(0) == '0' || $("#yuusya1_hp").val() > 999)) {
        document.getElementById('message').innerHTML = '<span class="message">ステータスが不正です<br>ステータスに0以下は設定できません<br>各ステータスの上限は999です</span>';
    }
    //ラジオボタンの動作確認用 none = デバッグモードが有効でも無効でもない 
    else if ($('[name=debug]:checked').val() == 'none') {
        document.getElementById('message').innerHTML = '<span class="message">デバッグモードの無効/有効の<br>選択をしてください</span>';
    }
    //デバッグモードを無効化してる場合にここまで来たということは0以下でも999以上でもない
    //デバッグモードを有効にしているときは必ずここまでくる
    else {
        //この一連の処理でやりたいことはplayer_statusへの値の代入
        //キャラ切り替え処理もやってる
        const P_num = player_selector();
        const NAME = [$("#yuusya1_name").val(), "デフォルト2", "デフォルト3", "デフォルト4"]
        const LV = [$("#yuusya1_lv").val(), $("#yuusya1_lv").val(), $("#yuusya1_lv").val(), $("#yuusya1_lv").val()];
        const HP = [$("#yuusya1_hp").val(), $("#yuusya1_hp").val(), $("#yuusya1_hp").val(), $("#yuusya1_hp").val()];
        const MP = [$("#yuusya1_mp").val(), $("#yuusya1_mp").val(), $("#yuusya1_mp").val(), $("#yuusya1_mp").val()];
        const ATK = [$("#yuusya1_atk").val(), $("#yuusya1_atk").val(), $("#yuusya1_atk").val(), $("#yuusya1_atk").val()];
        const INT = [$("#yuusya1_int").val(), $("#yuusya1_int").val(), $("#yuusya1_int").val(), $("#yuusya1_int").val()];
        const DEF = [$("#yuusya1_def").val(), $("#yuusya1_def").val(), $("#yuusya1_def").val(), $("#yuusya1_def").val()];
        const SPD = [$("#yuusya1_spd").val(), $("#yuusya1_spd").val(), $("#yuusya1_spd").val(), $("#yuusya1_spd").val()];
        player_status = [NAME[P_num], LV[P_num], HP[P_num], MP[P_num], ATK[P_num], INT[P_num], DEF[P_num], SPD[P_num]];
    }

    /*作るプレイヤーの数による分岐*/

    if (Player＿num == 1) {
        //インスタンスにはステータスとアイテムとスキルを格納する（2022/06/16時点）
        const Player1 = new Player(player_status, 1, 1);
        Player1.status_set();
        Player1.status_get();
        return Player1;

    }

    if (Player＿num == 2) {
        const Player1 = new Player("a", 1, 1, 1);
        Player1.name_get();
        const Player2 = new Player("i", 1, 1, 1);
        Player2.name_get();
        return Player1, Player2;
    }

    if (Player＿num == 3) {
        const Player1 = new Player("a", 1, 1, 1);
        const Player2 = new Player("i", 1, 1, 1);
        const Player3 = new Player("u", 1, 1, 1);
        return Player1, Player2, Player3;

    }

    if (Player＿num == 4) {
        const Player1 = new Player("a", 1, 1, 1);
        const Player2 = new Player("i", 1, 1, 1);
        const Player3 = new Player("u", 1, 1, 1);
        const Player4 = new Player("e", 1, 1, 1);
        return Player1, Player2, Player3, Player4;

    }



}







// これを名前を入力したあとに自動でPlayer1,Player2とかみたいに作られていく感じにしたら良いはず


// ここに書いたら勝手に実行される
//Player1.name_set();
//Player1.name_get();



/*バトル部分*/

//連戦させたいならmaou1.htmlとかのファイル名にして1の部分を勝利するごとに1加算してくプログラムにすれば連戦になるかな

//敵の最大体力
enemy_MAX_HP = $('.st-enemyHP').val()

//味方の最大体力
player_MAX_HP = $('.st-playerHP').val()

//ゲームオーバー画面に使うhtml要素
const endWindow = document.querySelector('.endWindow');




//DQ3のダメージ計算式
//参考にでも
function dq3_damage_calc() {
    var attack = parseInt($(".st-playerATK").val(), 10);
    var defence = parseInt($(".st-enemyDEF").val(), 10) / 2;

    //変数に数値が格納されてるかどうかの判断？
    if (typeof attack == "number" && typeof defence == "number") {

        var maxDamage;
        var minDamage

        if (parseInt($(".st-enemyDEF").val()) >= 1023) {
            maxDamage = 1;
            minDamage = 0;
        } else if ((attack - defence) <= (attack / 8)) {
            maxDamage = attack / 8 - 1;
            minDamage = 0;
        } else {
            maxDamage = (attack - defence) * (99 + 54) / 256;
            minDamage = (attack - defence) * 99 / 256;
        }
        //最大値～最小値の範囲の乱数を返す
        console.log("ダメージ計算式" + Math.trunc(Math.random() * (maxDamage - minDamage) + minDamage));
        return Math.trunc(Math.random() * (maxDamage - minDamage) + minDamage);
    }
}

//DQ9のダメージ計算式
//参考サイトhttps://wiki.denfaminicogamer.jp/dq11/%E3%83%80%E3%83%A1%E3%83%BC%E3%82%B8%E8%A8%88%E7%AE%97
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
            $('.img-center').html('<img src="img/クリア.jpg" width=230 height=230 border="1">' + '<div>魔王を倒した！</div>');
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
            $('.img-center').html('<img src="img/ゲームオーバー.jpg" width=230 height=230 border="1">' + '<div>勇者は負けてしまった！</div>');
            endWindow.classList.add("show");

        }


        //敵がいないときの処理
    } else {
        console.log("敵がいません")
        document.getElementById('message').innerHTML = '<span class="message">敵がいません</span>'
    }



}

function Battle(player_status, enemy_status) {



    //テスト用
    //player_status[P_HP] = 100000000

    /*勝敗の判定とゲームオーバー,ゲームクリアを判定する*/
    //テスト版だけどちゃんとHP判定して勝敗判定してる
    //実際にはhtmlのクラスからvalueを持ってきて勝敗を判定する
    //敗北したらゲームオーバー画面の挿入、勝利したらゲームクリア画面の挿入をすれば良い
    if (player_status[P_HP] > enemy_status[E_HP]) {
        console.log("勝利！")
        console.log("P_HP: " + player_status[P_HP] + "\nE_HP: " + enemy_status[E_HP])

        $('#all_interference').detach();
        $('.img-center').html('<img src="img/クリア.jpg" width=230 height=230 border="1">' + '<div>魔王を倒した！</div>');
        endWindow.classList.add("show");

    } else {
        console.log("敗北！")
        console.log("P_HP: " + player_status[P_HP] + "\nE_HP: " + enemy_status[E_HP])
            //機能してる
            //とりあえずのサンプルゲームオーバー画面だから後で変えるかも
            //全ての要素をカバーしているall_interferenceを削除することでゲームオーバー画面だけ表示
            //removeでもいいけどdetachなら後で要素を復元できる

        $('#all_interference').detach();
        //この記法でも場面毎に画像を切り替えることが可能
        //ここはゲームオーバー処理をしているのでその画像を指定
        $('.img-center').html('<img src="img/ゲームオーバー.jpg" width=230 height=230 border="1">' + '<div>勇者達は全滅してしまった</div>');
        endWindow.classList.add("show");
    }



}



/*戦闘の判定方法*/

//html要素の数値(hp数値)を判定して
//プレイヤーHPが0ならゲームオーバー画面表示
//敵HPが0ならクリア画面表示とかで良い気がする