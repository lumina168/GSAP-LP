//アニメーションの実装に関わらず全部を見ていきなり全部をゼロから実装するのではなく
//一つ一つ分解して考える
//businessセクションのアニメーションについて考えると
//１    まずフェードイン
//２    時間差
//３    スクロールに応じて
//と段階を踏んで考える

//
// autoAlphaが推奨とのこと
// opacity
// と
// visibiliry:hidden;  非表示
// を合わせて使ってるとのこと
// opacityのみにしておくとテキストの選択範囲が反応してしまうとのこと


/* ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
 * header/mainvisual    GSAP    timelineで発火の順番を決める
 * ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/

window.addEventListener('DOMContentLoaded',function(){ //
    gsap.registerPlugin(ScrollTrigger);//pluginの登録明示する   なくても動く明示したらなぜか動かない

    const tl = gsap.timeline();//①time line の変数を作成
        tl //②tl指定してあげてtimeline開始    ※（fromToで左から右の中括弧の切り替わりを指定してるけどopacityがcss当たっていれば起点を指定する必要がないのでtoでOK
            .fromTo('#mainvisual img',{autoAlpha:0},{autoAlpha:1,duration:2})//③1秒かけて画像を出す
            .fromTo('#mainvisual .mask',{autoAlpha:0},{autoAlpha:1,duration:2},'<')//④<はtimelineで繋ぐのではなく画像の出現と同時に出てくる仕様としてる
            .fromTo('#mainvisual .copy',{scale:1.2,autoAlpha:0},{scale:1,autoAlpha:1,duration:3})//⑤mask発動後copyを3秒かけて発動
            .fromTo('#mainvisual .copy-small',{scale:1.3,autoAlpha:0},{scale:1,autoAlpha:1,duration:3},'-=2')//⑤copy発火後2秒後に発火させる
            .fromTo('#header',{y:-82},{y:0,duration:.2},'-=1.5')//⑤copy-small発火後1.5秒後に発火



/* ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
 * news
 * ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
        gsap.fromTo('.news__section_title',{autoAlpha:0,y:30},{autoAlpha:1,y:0,        
            scrollTrigger:{    
                trigger:'.news__section_title',  
                start:'top 80%', 
                toggleActions:'play none none reverse',    
            } 
        })
    
        gsap.fromTo('.news__list',{autoAlpha:0,x:-100},{autoAlpha:1,x:0,   
            scrollTrigger:{    
                trigger:'.news__list',  
                start:'top 80%', 
                toggleActions:'play none none reverse',    
            } 
    })
    
/* ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
 * about
 * ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
        gsap.fromTo('.about__section_title',{autoAlpha:0,y:100},{autoAlpha:1,y:0,     
            scrollTrigger:{    
                trigger:'.about__section_title',  
                start:'top 80%', 
                toggleActions:'play none none reverse',    
            } 
        })
    
        gsap.fromTo('.about__right_textWrapper',{autoAlpha:0,y:100},{autoAlpha:1,y:0,     
            scrollTrigger:{    
                trigger:'.about__right_textWrapper',  
                start:'top 80%', 
                toggleActions:'play none none reverse',    
            } 
    })
        gsap.fromTo('.about__left',{autoAlpha:0,x:-100},{autoAlpha:1,x:0,       
            scrollTrigger:{    
                trigger:'.about__left',  
                start:'top 80%', 
                toggleActions:'play none none reverse',    
            } 
    })
    

            
/* ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
 * business    GSAP  fadeInUp   staggerで動く順番や動くスピードを決める  scrollTriggerで発火場所を決める   移動は２５pxぐらいが違和感がない動きとのこと
 * ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
        gsap.fromTo('.business__section_title',{autoAlpha:0,x:-100},{autoAlpha:1,x:0,   
            scrollTrigger:{    
                trigger:'.business__section_title',  
                start:'top 80%', 
                toggleActions:'play none none reverse',    
            } 
        })

        gsap.fromTo('.business__itemBox',{autoAlpha:0,y:30},{autoAlpha:1,y:0,   //①fadeInUp itemBoxを縦軸３０pxしたから元の位置にふわっと戻す指定     
            stagger:{    //②item４枚ある中で時間差にstaggerを使う   
                each:.3,    //時間差の秒数
                from: 'start',    //fromプロパティどこから出したいか
            },

            scrollTrigger:{     //スクロールトリガー（どこで発火させるかを決めるとき使用）
                trigger:'#business', //トリガーの発火位置
            //①start scrub end  を使用したとき
                // start:'10% center', //値の左側トリガーのスタート位置(この例ではsectionbusinessの頭)値の右側ウィンドーの位置 この両方が重なったときに発火する
                //scrubとendは、startとendの間のみ処理をおこなう    その範囲内で出したり消したりする処理を消す処理を行わないときは不要
                // scrub:true,     //endを使うときはscrubをtrue することによってendに差し掛かったときまた消すことができる
                // end:'70% 40%', //値の左側トリガーのを終わらせる位置(この例ではsectionbusinessから70%)値の右側ウィンドーの位置 この両方が重なったときに発火startで発火した処理を終了させる
                
            //②start toggleActions  を使用したとき
                start:'10% center', //値の左側トリガーのスタート位置(この例ではsectionbusinessの頭)値の右側ウィンドーの位置 この両方が重なったときに発火する
                toggleActions:'play none none reverse',//enterの時playが始まるという意味    leave,EnterBackでは何も始まらない   leaveBackの時reverseが始まるという意味
                



                // ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー



                //コールバック関数で検証ツールのconsoleでスクロールトリガーが発火した状態を確認できる
                onEnter:()=>{   //playに当たる部分（enter）（scroll-startとstartが入りで重なる部分）
                    console.log('enter')
                },
                onLeave:()=>{   //noneに当たる部分(leave)（scroll-endとstartが入りで重なる部分）
                    console.log('leave')
                },
                onEnterBack:()=>{   //reverseに当たる部分(EnterBack)（scroll-endとendが戻りで重なる部分）
                    console.log('EnterBack')
                },
                onLeaveBack:()=>{   //noneに当たる部分(leaveBack)（scroll-startとendが戻りで重なる部分）
                    console.log('leaveBack')
                },

                markers:true,   //開発するときはmarkersを使わないとどこで発火するのか確認できない
            }
        })


/* ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
 * company
 * ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
gsap.fromTo('.company__section_title',{autoAlpha:0,x:-100},{autoAlpha:1,x:0,     
    scrollTrigger:{    
        trigger:'.company__section_title',  
        start:'top 80%', 
        toggleActions:'play none none reverse',    
    } 
})
gsap.fromTo('.company__info',{autoAlpha:0,x:-100},{autoAlpha:1,x:0,     
    scrollTrigger:{    
        trigger:'.company__info',  
        start:'top 80%', 
        toggleActions:'play none none reverse',    
    } 
})


/* ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
 * company__img //パララックス
 * ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー*/
    const targets = document.querySelectorAll('.js-parallax');

    targets.forEach((target) => {
        gsap.fromTo(target.querySelector('img'), {
         y: 100,
        }, {
         y: -100, // y方向-に60px移動させる
         ease: "none", // イージングなし
         scrollTrigger: {
          trigger: target, // ScrollTriggerの開始位置を計算するために使用される要素
          start: "top bottom", // 1つ目の値がtriggerで指定した要素の開始位置 2つ目の値が画面の開始位置
          end: "bottom top", // 1つ目の値がtriggerで指定した要素の終了位置 2つ目の値が画面の終了位置
          scrub: .5, // 要素を1秒遅れで追従させる
          // markers: true, // 開始位置、終了位置を調整確認する際に使用します
         }
        }); 
       });
       

        


})