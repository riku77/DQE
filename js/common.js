var menu_id = 0;
var maou_id = 0;






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
                        activeMenu(5);
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
                    if (menu_id >= 5) {
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
            document.getElementById('message').innerHTML = '<span class="message">歴代魔王と連戦する</span>';
            break;
        case 2:
            document.getElementById('message').innerHTML = '<span class="message">戦う魔王を選択できる</span>';
            break;
        case 3:
            document.getElementById('message').innerHTML = '<span class="message">戦闘キャラのステータスなどを設定する<br>デフォルトPTもあるので<br>必須ではありません<br>(この機能は実装しない可能性あり)</span>';
            break;
        case 4:
            document.getElementById('message').innerHTML = '<span class="message">アイテムなどを手に入れて有利に進めよう<br>(この機能は実装しない可能性あり)</span>';
            break;
        case 5:
            document.getElementById('message').innerHTML = '<span class="message">入手したアイテムの一覧<br>(この機能は実装しない可能性あり)</span>';
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
        case 1: //魔王連戦
            window.location.href = '戦闘/竜王/竜王.html';
            break;
        case 2: //魔王選択
            document.getElementById('message').innerHTML = '<span class="message">メニューを開きました</span>';
            // そのままだとキーボード操作dで戦う魔王を選択できないから別で処理を作成
            switch (event.keyCode) {
                case 13: //エンターキー
                    //作ったインスタンスを破壊しないとおかしくなる
                    //破壊する場合は3.0だとunmaountなので注意
                    document.querySelector(".strategy-status").classList.contains("active") ? document.querySelector(".strategy-status").classList.remove("active") : document.querySelector(".strategy-status").classList.add("active");
                    Vue.createApp(maou_keyboard_operation).mount('.window')
                    break;
            }

            maou_window_view();
            break;
        case 3: //PT作成(実装しないかも)


            break;
        case 4: //ふくびき(実装しないかも)

            break;
        case 5: //もちもの

            break;
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
            window.location.href = '戦闘/ゾーマ/ゾーマ.html';
            break;
        case 4: //にげる
            break;
        case 13:

            window.location.href = '戦闘/ダークドレアム/ダークドレアム.html';
            break

        case 14: //一回開いたメニューを閉じる
            //これでページ更新しても解決するか？
            //location.reload();
            document.querySelector(".strategy-status").classList.remove("active");
            document.getElementById('message').innerHTML = '<span class="message">メニューを閉じました</span>';
            break;
        default:
            break;
    }
}