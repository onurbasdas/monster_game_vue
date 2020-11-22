new Vue({
  el: "#app",
  data: {
    logs: [],
    player_heal: 100,
    monster_heal: 100,
    game_is_on: false,
    attack_multiple: 10,
    special_attack_multiple: 28,
    heal_up_multiple: 30,
    monster_attack_multiple: 25,
    log_text: {
      attack: "Oyuncu atagi: ",
      special_attack: "Ozel oyuncu atagi: ",
      heal_up: "Ilk Yardim: ",
      give_up: "Oyuncu pes etti: ",
      monster_attack: "Canavar atagi: ",
    },
  },
  methods: {
    start_game: function () {
      this.game_is_on = true;
    },
    attack: function () {
      var point = Math.ceil(Math.random() * this.attack_multiple);
      this.monster_heal -= point;
      this.add_to_log({ turn: "p", text: this.log_text.attack + point });
      this.monster_attack();
    },
    special_attack: function () {
      var point = Math.ceil(Math.random() * this.special_attack_multiple);
      this.monster_heal -= point;
      this.add_to_log({
        turn: "p",
        text: this.log_text.special_attack + point,
      });
      this.monster_attack();
    },
    heal_up: function () {
      var point = Math.ceil(Math.random() * this.heal_up_multiple);
      this.player_heal += point;
      this.add_to_log({ turn: "p", text: this.log_text.heal_up + point });
      this.monster_attack();
    },
    give_up: function () {
      this.player_heal = 0;
      this.add_to_log({ turn: "p", text: this.log_text.give_up + point });
    },
    monster_attack: function () {
      var point = Math.ceil(Math.random() * this.monster_attack_multiple);
      this.add_to_log({
        turn: "m",
        text: this.log_text.monster_attack + point,
      });
      this.player_heal -= point;
    },
    add_to_log: function (log) {
      this.logs.push(log);
    },
  },
  watch: {
    player_heal: function (value) {
      if (value <= 0) {
        this.player_heal = 0;
        if (confirm("Oyunu Kaybettin. Tekrar denemek ister misin?")) {
          this.player_heal = 100;
          this.monster_heal = 100;
          this.logs = [];
        }
      } else if (value >= 100) {
        this.player_heal = 100;
      }
    },
    monster_heal: function (value) {
      if (value <= 0) {
        this.monster_heal = 0;
        if (confirm("Oyunu Kazandın. Tekrar denemek ister misin?")) {
          this.player_heal = 100;
          this.monster_heal = 100;
          this.logs = [];
        }
      }
    },
  },
  computed : {
      user_Progress: function(){
          return {
              width : this.player_heal + '%'
          }
      },
      monster_Progress: function(){
          return {
              width : this.monster_heal + '%'
          }
      }
  }
});
