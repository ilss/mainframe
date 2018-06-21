$(function () {
    var _array_preload_img = [
        "image/mainframe/mainframe_action_block_question.png",
        "image/mainframe/bg_mainframe_action_block.png",
        "image/mainframe/action_mainframe_action_block_main.gif",
        "image/mainframe/action_mainframe_attack_linghting.png"
    ];
    GLOBAL_FUNC_SIMPLEEDU.preloadImg(_array_preload_img);

    var MAINFRAME = {
        _options: {
            _action_div_id: 'mainframe_action_block',
            _action_team_ul_id: 'ul_mainframe_action_team_list',
            _action_team_ul_class: 'ul_mainframe_action_team_list',
            _action_team_block_id: 'mainframe_action_block_main',
            _action_team_block_class: 'mainframe_action_block_main',
            _action_team_icon_dom_key: 'data-team-id',
            _team_icon_size: 40,
            _team_num: 10
        },
        _win_width: $(window).width(),
        _array_team: [],
        _array_topic: [],
        _team_change_index: 0,
    };

    MAINFRAME.initTeam = function () {
        var _html = '<ul class="' + this._options._action_team_ul_class + '" id="' + this._options._action_team_ul_id + '">';
        for (var _i = 0; _i < this._options._team_num; _i++) {
            _html += '<li>' +
                '<img src="" ' + this._options._action_team_icon_dom_key + '="" />' +
                '</li>';
        }
        _html += '</ul>';
        $('#' + MAINFRAME._options._action_div_id).append(_html);
    };
    MAINFRAME.initQuestion = function (data) {
        var _element = null,
            _levels = null,
            _html = '<ul class="' + this._options._action_team_block_class + '" id="' + this._options._action_team_block_id + '">';
        for (var _i = 0, _len = data.length; _i < _len; _i++) {
            _html += '<li data-topic-id="' + data[_i]["topic_id"] + '">' +
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
    };
    MAINFRAME.getTopicById = function (topic_id) {
        return $('#' + this._options._action_team_block_id).find("li[data-topic-id=" + topic_id + "]");
    };
    MAINFRAME.getLevelById = function (topic_id, level_id) {
        var target = this.getTopicById(topic_id);
        return target.find("img[data-qid=" + level_id + "]");
    };
    MAINFRAME.getTeamById = function (group_id) {
        return $('#' + this._options._action_team_ul_id).find('img[' + this._options._action_team_icon_dom_key + "=" + group_id + "]");
    };
    MAINFRAME.teamAttack = function (data) {
        var _li = null,
            _root_div = $('#' + this._options._action_div_id),
            _html = data.group_name + '<img src="' + data.group_icon + '" data-team-id="' + data.group_id + '" />',
            _level = this.getLevelById(data.topic_id, data.level_id),
            _root_div_offset_top = _root_div.offset().top,
            _root_div_offset_left = _root_div.offset().left;

        if (MAINFRAME.getTeamById(data.group_id).length > 0) {
            _li = MAINFRAME.getTeamById(data.group_id).parent();
        } else {
            _li = $('#' + this._options._action_team_ul_id + '>li:eq(' + this._team_change_index + ')');
        }
        var _team_icon = _li.find("img"),
            _team_icon_pos_top = Math.round(_team_icon.offset().top - _root_div_offset_top),
            _team_icon_pos_left = Math.round(_team_icon.offset().left - _root_div_offset_left),
            _level_pos_top = Math.round(_level.offset().top - _root_div_offset_top),
            _level_pos_left = Math.round(_level.offset().left - _root_div_offset_left),
            _rotate = GLOBAL_FUNC_SIMPLEEDU.getRotate({ "x": _team_icon_pos_left, "y": _team_icon_pos_top }, { "x": _level_pos_left, "y": _level_pos_top - 30 * this._win_width / 1920 });
        _li.html('').html(_html).addClass('animated bounceIn');
        // alert(data.level_id);
        var _distance = GLOBAL_FUNC_SIMPLEEDU.twoPosDistance({ "x": _team_icon_pos_left, "y": _team_icon_pos_top }, { "x": _level_pos_left, "y": _level_pos_top });
        _html = $('<span>');
        _html.addClass('action_mainframe_attack_linghting_area').css({ "width": _distance / this._win_width * 100 + "vw", "transform": 'rotate(' + (0 - _rotate - 180) + 'deg)' });
        _attack_linghting = '<span class="action_mainframe_attack_linghting"><img src="image/mainframe/action_mainframe_attack_linghting.png" /><img src="image/mainframe/action_mainframe_attack_linghting.png"/><img src="image/mainframe/action_mainframe_attack_linghting.png" /></span>'
        _html.append(_attack_linghting);
        _li.append(_html);
        $('span.action_mainframe_attack_linghting').animate({
            left: _distance / this._win_width * 100 + "vw"
        }, 2000, function () {
            $(this).parent().remove();
        });

        this._team_change_index++;
    };

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
        {
            topic_id: 0003,
            'levels': [
                1, 2, 3, 4, 5 // 小题id
            ]
        }
    ];
    MAINFRAME.initQuestion(_qusetion_json);
    MAINFRAME.initTeam();

    var activity = {
        'group_id': 1, // 团队id
        'group_name': '赵信团队1', // 团队名称
        'group_icon': 'image/mainframe/34234.jpg', // 团队头像
        'topic_id': 1, // 被攻击的大题id
        'level_id': 1 // 被攻击的小题id
    };
    MAINFRAME.teamAttack(activity);
    activity = {
        'group_id': 2, // 团队id
        'group_name': '赵信团队2', // 团队名称
        'group_icon': 'image/mainframe/34234.jpg', // 团队头像
        'topic_id': 1, // 被攻击的大题id
        'level_id': 1 // 被攻击的小题id
    };
    MAINFRAME.teamAttack(activity);
    activity = {
        'group_id': 3, // 团队id
        'group_name': '赵信团队2', // 团队名称
        'group_icon': 'image/mainframe/34234.jpg', // 团队头像
        'topic_id': 2, // 被攻击的大题id
        'level_id': 4 // 被攻击的小题id
    };
    MAINFRAME.teamAttack(activity);

    $('#ul_mainframe_action_team_list').css({ "cursor": "pointer" }).delegate('img', 'click', function () {
        var _this = $(this);
        activity = {
            'group_id': $(this).attr("data-team-id"), // 团队id
            'group_name': '赵信团队2', // 团队名称
            'group_icon': 'image/mainframe/34234.jpg', // 团队头像
            'topic_id': 1, // 被攻击的大题id
            'level_id': 1 // 被攻击的小题id
        };
        // alert(JSON.stringify(activity));
        MAINFRAME.teamAttack(activity);
        _this.stopPropagation();
    });
});