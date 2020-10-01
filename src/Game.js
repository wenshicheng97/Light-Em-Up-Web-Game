import $ from 'jquery';

import {parse_json} from './parse_json';

export function Game(sel) {
    console.log(sel);
    this.sel = sel;
    this.form = $(sel);
    var that=this;

    if (!this.form || this.form.length < 1) {
        console.log("return");
        return;
    }

    //this.installListeners();
    $(sel + " td.cell button").click(function(event) {
        event.preventDefault();

        var loc = this.value.split(',');
        var r = loc[0];
        var c = loc[1];
        console.log(r+','+c);
        //console.log($("body > div"))
        $.ajax({
            url: "post/game-post.php",
            data: {cell:r+','+c},
            method: "POST",
            dataType: "text",
            success: function (data) {
                var b = $("body");
                var json = parse_json(data);

                //console.log("ok");
                //that.update(r,c);
                $("body > div").html(json.game);
                new Game(".game");

            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });
    });
    $(sel + ' button.check').click(function(event) {
        event.preventDefault();
        console.log('clicked check');
        $.ajax({
            url: "post/game-post.php",
            data: {check:true},
            method: "POST",
            dataType: "text",
            success: function (data) {
                var b = $("body");
                var json = parse_json(data);

                $("body > div").html(json.game);
                new Game(".game");

            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });
    });

    $(sel + ' button.clear').click(function(event) {
        event.preventDefault();
        console.log('clicked clear');
        $.ajax({
            url: "post/game-post.php",
            data: {clear:true},
            method: "POST",
            dataType: "text",
            success: function (data) {
                var b = $("body");
                var json = parse_json(data);

                $("body > div").html(json.game);
                new Game(".game");

            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });
    });
    $(sel + ' button.solve').click(function(event) {
        event.preventDefault();
        console.log('clicked solve');
        $.ajax({
            url: "post/game-post.php",
            data: {solve:true},
            method: "POST",
            dataType: "text",
            success: function (data) {
                var b = $("body");
                var json = parse_json(data);

                $("body > div").html(json.game);
                new Game(".game");

            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });
    });

    $(sel + ' button.yes').click(function(event) {
        event.preventDefault();
        console.log('clicked yes');
        $.ajax({
            url: "post/game-post.php",
            data: {yes:true},
            method: "POST",
            dataType: "text",
            success: function (data) {
                var b = $("body");
                var json = parse_json(data);

                $("body > div").html(json.game);
                new Game(".game");

            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });
    });

    $(sel + ' button.no').click(function(event) {
        event.preventDefault();
        console.log('clicked no');
        $.ajax({
            url: "post/game-post.php",
            data: {no:true},
            method: "POST",
            dataType: "text",
            success: function (data) {
                var b = $("body");
                var json = parse_json(data);

                $("body > div").html(json.game);
                new Game(".game");

            },
            error: function(xhr, status, error){
                console.log(error);
            }
        });
    });

}
