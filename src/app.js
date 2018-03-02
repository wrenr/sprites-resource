var app = {};

app.sprites = sprites;

app.imgPrefix = 'https://wrenr.github.io/sprites-resource/img/nes-zelda/';

app.getSpriteGroup = (sprites, category) => {
  return sprites.filter( (sprite) => sprite.category == category);
}

let bus = new Vue()

Vue.component('contents-row', {
  props: ['row'],

  template: `<li class=pure-menu-item><a @click="updateSelection()" class=pure-menu-link href="#result"><img :alt="row.name" :src="'${app.imgPrefix}'+ row.path" :title="row.slug"> {{ row.name }}</a></li>`,
  data: function() {
    return {
      dataRow: this.row
    }
  },
  methods: {
    updateSelection: function(event) {
      bus.$emit('updateResult', this.dataRow);
    }
  }
});



app.contents = () => {

  var bossContents = new Vue({
    el: '#contents .bosses',
    data: {
      sprites: app.getSpriteGroup(sprites, 'boss')
    }
  });

  var characterContents = new Vue({
    el: '#contents .characters',
    data: {
      sprites: app.getSpriteGroup(sprites, 'character')
    }
  });

  var enemyContents = new Vue({
    el: '#contents .enemies',
    data: {
      sprites: app.getSpriteGroup(sprites, 'enemy')
    }
  });


  var itemContents = new Vue({
    el: '#contents .items',
    data: {
      sprites: app.getSpriteGroup(sprites, 'item')
    }
  });

  var objectContents = new Vue({
    el: '#contents .objects',
    data: {
      sprites: app.getSpriteGroup(sprites, 'object')
    }
  });

}

app.result = () => {
  var results = new Vue({
    created: function() {
     bus.$on('updateResult', this.showResult)
    },
    el: "#result",
    data: function() {
      return {
        shouldRender: false,
        name: '',
        path: '',
        slug: '',
        copied: false
      }
    },
    methods: {
      showResult: function(sprite) {
        this.shouldRender = true;
        this.name = sprite.name;
        this.path = app.imgPrefix + sprite.path;
        this.slug = sprite.slug;
      }
    }
  })
}

// [![Gleeok, 1-Headed](https://wrenr.github.io/sprites-resource/img/nes-zelda/TLoZ_Gleeok_One-Headed_Sprite.png "Gleeok, One Headed")](#gleeok-1-headed)

new ClipboardJS('#result .btn');
app.contents()
app.result()

// <a name="aquamentus"></a> <img alt="Aquamentus" src="https://wrenr.github.io/sprites-resource/img/nes-zelda/TLoZ_Aquamentus_Sprite.png" title="Aquamentus"> Aquamentus
