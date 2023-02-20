# DjangoのテンプレートをViteでビルドする<br>
## ~ Vue.jsの単一ファイルコンポーネントを用いる ~

<br>

## **説明のため、「Viteのビルドプロジェクト」のディレクトリ構成を表示**
```
vueapp
├── README.md
├── jsconfig.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── logo.png
│   │   └── logo.svg
│   ├── components
│   │   ├── Annotation.vue
│   │   ├── AnnotationsPanel.vue
│   │   ├── AreaAnnotations.vue
│   │   ├── HelloWorld.vue
│   │   └── ImagePanel.vue
│   ├── pages
│   │   └── support-info
│   │       ├── App.vue
│   │       └── main.js
│   └── plugins
│       ├── index.js
│       ├── vuetify.js
│       └── webfontloader.js
├── vite.config.js
└── yarn.lock
```

<br>

## **Viteの設定ファイル(vite.config.js)**

<script src="https://gist.github.com/ozuaq/9662a7c2bd254f866f95cfd0efa2a8e1.js"></script>

**行25~30**
```
 pages: {
        "support-info": {
          title: "support-info"
        },
        
      },
```
- 各ページの設定

**行51**
```
base: '/static/vue-dist/'
```
- base URLの設定

**行52~54**
```
build: {
    outDir: '../static/vue-dist',
  }
```
- ビルドによって生成されたファイルの出力先ディレクトリの設定

<br>

## **ベースとなるテンプレートファイル(public/index.html)**
※ビルド時、ベースとするテンプレートファイルのこと

<script src="https://gist.github.com/ozuaq/6c3eb5e31dbcaf6ea676a441983c2826.js"></script>

**行8**
```
<%= BASE_URL %>
```
- vite.config.jsで設定したbase URLを挿入

**行10**
```
<%= htmlWebpackPlugin.options.title %>
```
- vite.config.jsで設定したページタイトルを挿入

**行21〜25**
```
{% if user.is_authenticated %}
    {{ user.username|json_script:"userName" }}
{% else %}
    {{ ""|json_script:"userName" }}
{% endif %}
```
- ユーザが認証されている(ログインしている)場合、PythonオブジェクトをJSONに変換して、ユーザ名をscriptタグ(id＝"userName")に格納している。これにより、JavaScriptでユーザ名を利用することと、認証されているかどうかで条件分岐することを出来るようにしている。

<br>

## Vue.jsの単一ファイルコンポーネント
### **コンポーネントツリーの構成図**
```
App.vue
├── AnnotationsPanel.vue
│   └── AreaAnnotations.vue
│       └── Annotation.vue
└── ImagePanel.vue
```

### **コンポーネントファイル**
**App.vue**

<script src="https://gist.github.com/ozuaq/7aec23055fcbba05e835cbdfbf1a75b0.js"></script>

<br>

**ImagePanel.vue**

<script src="https://gist.github.com/ozuaq/d22a514b13c30890c6521aab2f10bac1.js"></script>

<br>

**AnnotationsPanel.vue**

<script src="https://gist.github.com/ozuaq/c2623fe04ad890c2948e134ada40ac7f.js"></script>

<br>

**AreaAnnotations.vue**

<script src="https://gist.github.com/ozuaq/0ceb6accb42a58957bf13ab22294e0f4.js"></script>

<br>

**Annotation.vue**

<script src="https://gist.github.com/ozuaq/ff11a74b2c49af31f6f1c182f8b252ff.js"></script>