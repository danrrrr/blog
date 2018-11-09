module.exports = {
    base: '/',
    title: "胡小丹的学习笔记",
    description: "Good good study, day day up! ",
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: [
            {
                text: '博客',
                link: '/blog/'
            },
            {
                text: '面试题',
                link: '/interview/'
            },
            {
                text: '读书笔记',
                link: '/reading/'
            }
        ],
        sidebar: {
            '/blog/': [
                'H5_wxShare',
                'js_prototype',
            ],
            '/reading/': [

            ]
        },
        lastUpdated: "更新时间",
        repo: "huxiaodanr/blog",
        docsDir: "docs",
        editLinks: false,
    }
};