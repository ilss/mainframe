/*
 * @Author: Liang Liang
 * @Date: 2018-06-20 10:28:41
 * @LastEditors: Liang Liang
 * @LastEditTime: 2018-06-22 18:28:41
 * @Description: 主机渗透动画区域
 */
$(function () {
    var MAINFRAME = {
        _options: {
            _action_div_id: 'mainframe_action_block',
            _action_team_ul_id: 'ul_mainframe_action_team_list',
            _action_team_ul_class: 'ul_mainframe_action_team_list',
            _action_team_block_id: 'mainframe_action_block_main',
            _action_team_block_class: 'mainframe_action_block_main',
            _action_team_icon_dom_img_key: 'data-team-id',
            _action_topic_dom_li_key: 'data-topic-id',
            _add_score_txt_color: 'yellow',
            _add_score_txt_size: 24,
            _team_icon_size: 40,
            _team_num: 10
        },
        _data_topic: null,
        _win_width: $(window).width(),
        _array_team: [],
        _array_topic: [],
        _team_change_index: 0,

        getTopicById: function (topic_id) {
            return $('#' + this._options._action_team_block_id).find('li[' + this._options._action_topic_dom_li_key + '=' + topic_id + ']');
        },
        getLevelById: function (topic_id, level_id) {
            var target = this.getTopicById(topic_id);
            return target.find("img[data-qid=" + level_id + "]");
        },
        getTeamById: function (group_id) {
            return $('#' + this._options._action_team_ul_id).find('img[' + this._options._action_team_icon_dom_img_key + "=" + group_id + "]");
        },
        initTeam: function () {
            var _html = '<ul class="' + this._options._action_team_ul_class + '" id="' + this._options._action_team_ul_id + '">';
            for (var _i = 0; _i < this._options._team_num; _i++) {
                _html += '<li>&nbsp;' +
                    '<img src="" ' + this._options._action_team_icon_dom_img_key + '="" />' +
                    '</li>';
            }
            _html += '</ul>';
            $('#' + MAINFRAME._options._action_div_id).append(_html);
        },
        initQuestion: function (data) {
            var _element = null,
                _levels = null,
                _html = '<ul class="' + this._options._action_team_block_class + '" id="' + this._options._action_team_block_id + '">';
            this._data_topic = data;
            for (var _i = 0, _len = data.length; _i < _len; _i++) {
                _html += '<li ' + this._options._action_topic_dom_li_key + '="' + data[_i]["topic_id"] + '">' +
                    '<span class="action_mainframe_action_block_main"></span>' +
                    '<div class="mainframe_action_block_question">';
                _levels = data[_i]["levels"];
                for (var _j = 0, _lenj = _levels.length; _j < _lenj; _j++) {
                    _element = _levels[_j];
                    _html += '<img src="image/mainframe/mainframe_action_block_question.png" data-qid=' + _element + ' />';
                }
                _html += '</div>';
                _html += '</li>';
            }
            _html += '</ul>';
            $('#' + this._options._action_div_id).append(_html);
        },
        teamAttack: function (data) {
            var _li = null,
                _root_div = $('#' + this._options._action_div_id),
                _html = data.group_name + '<img src="' + data.group_icon + '" data-team-id="' + data.group_id + '" />',
                _level = this.getLevelById(data.topic_id, data.level_id),
                _root_div_offset_top = _root_div.offset().top,
                _root_div_offset_left = _root_div.offset().left;

            if (!data.group_id && MAINFRAME.getTeamById(data.group_id).length > 0) {
                _li = MAINFRAME.getTeamById(data.group_id).parent();
            } else {
                _li = $('#' + this._options._action_team_ul_id + '>li:eq(' + this._team_change_index + ')');
                this._team_change_index++;
            }
            var _team_icon = _li.find("img");
            if (_team_icon.length === 0) {
                return;
            }
            var _team_icon_pos_top = Math.round(_team_icon.offset().top - _root_div_offset_top),
                _team_icon_pos_left = Math.round(_team_icon.offset().left - _root_div_offset_left),
                _level_pos_top = Math.round(_level.offset().top - _root_div_offset_top),
                _level_pos_left = Math.round(_level.offset().left - _root_div_offset_left),
                _rotate = GLOBAL_FUNC_SIMPLEEDU.getRotate({ "x": _team_icon_pos_left, "y": _team_icon_pos_top }, { "x": _level_pos_left, "y": _level_pos_top });
            _li.html('').html(_html).addClass('animated bounceIn');

            var _distance = GLOBAL_FUNC_SIMPLEEDU.twoPosDistance({ "x": _team_icon_pos_left, "y": _team_icon_pos_top }, { "x": _level_pos_left, "y": _level_pos_top });
            _html = $('<span>');
            _html.addClass('action_mainframe_attack_linghting_area')
                .css({
                    "width": GLOBAL_FUNC_SIMPLEEDU.px2vw(_distance, this._win_width) + "vw",
                    "transform": 'rotate(' + (0 - _rotate - 180) + 'deg)'
                });
            _attack_linghting = '<span class="action_mainframe_attack_linghting">' +
                '<img src="image/mainframe/action_mainframe_attack_linghting.png" />' +
                '<img src="image/mainframe/action_mainframe_attack_linghting.png" />' +
                '<img src="image/mainframe/action_mainframe_attack_linghting.png" />' +
                '</span>';
            _html.append(_attack_linghting);
            _li.append(_html);

            $('span.action_mainframe_attack_linghting').animate({
                left: GLOBAL_FUNC_SIMPLEEDU.px2vw(_distance, this._win_width) + "vw"
            }, 2000,
                function () {
                    $(this).parent().remove();
                });
            setTimeout(function () {
                MAINFRAME.levelEffect(data.group_id, _level, data.score_gained);
            }, 2000);
        },
        levelEffect: function (team_id, level, score) {
            var _topic_li = level.parent().parent(),
                _pos_html_top = level.offset().top - _topic_li.offset().top + level.height() / 2,
                _pos_html_left = level.offset().left - _topic_li.offset().left + level.width() / 2,
                _topic_num = this._data_topic.length,
                _width_img = GLOBAL_FUNC_SIMPLEEDU.px2vw(_topic_num > 1 ? 150 : 300 * this._win_width / 1920, this._win_width);

            if (score > 0) {
                //击中
                var _html_span = $("<span></span>")
                    .css({
                        "position": "absolute",
                        "display": "block",
                        "width": _width_img + 'vw',
                        "height": _width_img + 'vw',
                        "top": GLOBAL_FUNC_SIMPLEEDU.px2vw(_pos_html_top, this._win_width) - _width_img / 2 + 'vw',
                        "left": GLOBAL_FUNC_SIMPLEEDU.px2vw(_pos_html_left, this._win_width) - _width_img / 2 + 'vw'
                    }),
                    _html = $('<img>')
                        .attr('src', 'image/mainframe/bg_mainframe_action_level_bomb_2.png')
                        .css({
                            "position": "absolute",
                            "top": 0, "left": 0,
                            "width": _width_img + 'vw',
                            "height": _width_img + 'vw'
                        });
                _html_span.append(_html);

                var _img_green = $('<img>')
                    .attr('src', 'image/mainframe/bg_mainframe_action_level_bomb_1.png')
                    .css({
                        "width": _width_img + 'vw',
                        "height": _width_img + 'vw'
                    });
                _img_green.css({
                    "position": "absolute",
                    "top": 0, "left": 0
                });

                _html_span.append(_img_green);
                _topic_li.append(_html_span);
                MAINFRAME.teamAddScoreEffect(team_id, score);
                _html_span.addClass("animated zoomIn");
                setTimeout(function () {
                    _img_green.addClass("animated fadeOut");
                }, 500);

                setTimeout(function () {
                    _html_span.removeClass("zoomIn").addClass("zoomOut");
                }, 1500);
                _html_span.velocity(
                    {
                        rotateZ: "720deg"
                    },
                    {
                        duration: 1000
                    }
                ).velocity(
                    {
                        rotateZ: "0deg"
                    },
                    {
                        duration: 1000
                    }
                );
                setTimeout(function () { _html_span.remove(); }, 3000);
            } else {
                //未击中
                MAINFRAME.teamAddScoreEffect(team_id, score);
            }
        },
        teamAddScoreEffect: function (team_id, score) {
            var _team = this.getTeamById(team_id).parent(),
                _img = $('<img>');
            if (score > 0) {
                var _dom_p = $('<p>').css({
                    "position": "absolute",
                    "width": GLOBAL_FUNC_SIMPLEEDU.px2vw(136, 1920) + 'vw',
                    "height": GLOBAL_FUNC_SIMPLEEDU.px2vw(136, 1920) / 2 + 'vw',
                    "overflow": "hidden",
                    "left": "50%",
                    "top": "-10%",
                    "color": this._options._add_score_txt_color,
                    "textAlign": "center",
                    "lineHeight": GLOBAL_FUNC_SIMPLEEDU.px2vw(136, 1920) / 2 + 'vw',
                    "fontSize": GLOBAL_FUNC_SIMPLEEDU.px2vw(this._options._add_score_txt_size, 1920) + 'vw',
                    "fontWeight": "bold",
                    "marginLeft": "-" + GLOBAL_FUNC_SIMPLEEDU.px2vw(136, 1920) / 2 + 'vw'
                }).text('+' + score);
                _img.attr('src', 'image/mainframe/action_mainframe_add_score.png').css({
                    "position": "absolute",
                    "width": GLOBAL_FUNC_SIMPLEEDU.px2vw(136, 1920) + 'vw',
                    "height": GLOBAL_FUNC_SIMPLEEDU.px2vw(136, 1920) + 'vw',
                    "border": "none",
                    "borderRadius": "0",
                    "top": 0
                });
                _dom_p.append(_img);
                _team.append(_dom_p);
                _dom_p.addClass('animated fadeIn');
                _img.velocity(
                    {
                        rotateZ: "720deg"
                    },
                    {
                        duration: 4000
                    }
                );
                setTimeout(function () {
                    _dom_p.addClass('animated fadeOut');
                }, 2000);
                setTimeout(function () {
                    _img.remove();
                }, 3000);
            } else {
                _img.attr('src', 'image/mainframe/mainframe_action_miss.png')
                    .css({
                        "position": "absolute",
                        "width": GLOBAL_FUNC_SIMPLEEDU.px2vw(73, 1920) + 'vw',
                        "height": GLOBAL_FUNC_SIMPLEEDU.px2vw(21, 1920) + 'vw',
                        "border": "none",
                        "borderRadius": "0",
                        "left": "50%",
                        "top": "0%",
                        "marginLeft": "-" + GLOBAL_FUNC_SIMPLEEDU.px2vw(73, 1920) / 2 + "vw"
                    });
                _team.append(_img);

                _img.addClass('animated shake');
                setTimeout(function () {
                    _img.addClass('fadeOutDown');
                }, 2000);
                setTimeout(function () {
                    _img.remove();
                }, 3000);
            }
        }
    };

    // 图片预加载
    MAINFRAME._array_preload_img = [
        "image/mainframe/mainframe_action_block_question.png",
        "image/mainframe/bg_mainframe_action_block.png",
        "image/mainframe/action_mainframe_action_block_main.gif",
        "image/mainframe/bg_mainframe_action_level_bomb_1.png",
        "image/mainframe/bg_mainframe_action_level_bomb_2.png",
        "image/mainframe/mainframe_action_miss.png",
        "image/mainframe/action_mainframe_add_score.png",
        "image/mainframe/action_mainframe_attack_linghting.png"
    ];

    GLOBAL_FUNC_SIMPLEEDU.preloadImg(MAINFRAME._array_preload_img);

    var _qusetion_json = [
        {
            topic_id: 0001,
            'levels': [
                1, 2, 3, 4, 5 // 小题id
            ]
        },
        {
            topic_id: 0002,
            'levels': [
                1, 2, 3, 4, 5 // 小题id
            ]
        },
        // {
        //     topic_id: 0003,
        //     'levels': [
        //         1, 2, 3, 4, 5 // 小题id
        //     ]
        // }
    ];
    MAINFRAME.initQuestion(_qusetion_json);
    MAINFRAME.initTeam();

    var activity = {
        'group_id': 1, // 团队id
        'group_name': '赵信团队1', // 团队名称
        'group_icon': 'image/mainframe/34234.jpg', // 团队头像
        'topic_id': 2, // 被攻击的大题id
        'level_id': 4, // 被攻击的小题id
        'score_gained': 20 // 得分
    };
    MAINFRAME.teamAttack(activity);
    activity = {
        'group_id': 2, // 团队id
        'group_name': '赵信团队2', // 团队名称
        'group_icon': 'image/mainframe/34234.jpg', // 团队头像
        'topic_id': 1, // 被攻击的大题id
        'level_id': 2, // 被攻击的小题id
        'score_gained': 0 // 得分
    };
    MAINFRAME.teamAttack(activity);
    activity = {
        'group_id': 3, // 团队id
        'group_name': '赵信团队2', // 团队名称
        'group_icon': 'image/mainframe/34234.jpg', // 团队头像
        'topic_id': 2, // 被攻击的大题id
        'level_id': 4, // 被攻击的小题id
        'score_gained': 20 // 得分
    };
    MAINFRAME.teamAttack(activity);


    $('#ul_mainframe_action_team_list').css({ "cursor": "pointer" }).delegate('img', 'click', function () {
        activity = {
            'group_id': $(this).attr("data-team-id"), // 团队id
            'group_name': '赵信团队2', // 团队名称
            'group_icon': 'image/mainframe/34234.jpg', // 团队头像
            'topic_id': 1, // 被攻击的大题id
            'level_id': 1, // 被攻击的小题id
            'score_gained': 20 // 得分
        };
        MAINFRAME.teamAttack(activity);
        event.stopPropagation();
    });
});