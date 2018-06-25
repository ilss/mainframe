# 主机渗透界面动画接口

> 初始化队伍
> MAINFRAME.initTeam();
```
生成10只队伍的默认空站位
```

> 初始题目
> MAINFRAME.initQuestion(_qusetion_json);
```
var _qusetion_json = [
            {
                topic_id: 0001,
                'levels': [
                    1, 2, // 小题id
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
            },
            {
                topic_id: 0004,
                'levels': [
                    1, 2, 3, 4, 5 // 小题id
                ]
            }
        ];
MAINFRAME.initQuestion(_qusetion_json);
```
> 队伍提交答案
> MAINFRAME.teamAttack(activity);
```
var activity = {
            'group_id': 1, // 团队id
            'group_name': '赵信团队1', // 团队名称
            'group_icon': 'image/mainframe/34234.jpg', // 团队头像
            'topic_id': 2, // 被攻击的大题id
            'level_id': 4, // 被攻击的小题id
            'score_gained': 20 // 得分
        };
MAINFRAME.teamAttack(activity);
```
---