import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cricket-app';

  currentTeam: string;
  buttonName: string;
  currentBall: number;
  currentOver: number;
  currentOverScores: Array<any>
  bowlInterval: any;
  teams: {
    teamA: {
      overwise: [],
      wickets: 0,
      score: 0,
      runRate: 0,
      balls: 0,
      players: Array<player>
    },
    teamB: {
      overwise: [],
      wickets: 0,
      score: 0,
      runRate: 0,
      balls: 0,
      players: Array<player>
    }
  }
  scores: Array<any>
  currentBatsmanPosition: number;
  currentBowlerPosition: number;
  math: any;
  teamAdata: boolean;
  teamBdata: boolean;
  result: string;

  constructor() {
    this.math = Math;
    this.scores = [0, 1, 2, 3, 4, 5, 6, "wd", "nb", "out"];
    this.buttonName = "Start";
    this.currentTeam = "teamA";
    this.currentBall = 1;
    this.currentOver = 1;
    this.currentOverScores = [];
    this.teams = {
      teamA: {
        overwise: [],
        score: 0,
        wickets: 0,
        runRate: 0,
        balls: 0,
        players: []
      },
      teamB: {
        overwise: [],
        score: 0,
        wickets: 0,
        runRate: 0,
        balls: 0,
        players: []
      }
    }
  }

  generatePlayers(teamName) {
    for (let i = 1; i <= 10; i++) {
      this.teams[teamName]["players"].push({
        name: teamName + '_Player_' + i,
        bowling: {
          balls: 0,
          runs: 0,
          wickets: 0,
          econ: 0,
          zeros: 0,
          fours: 0,
          sixes: 0,
          wides: 0,
          noBalls: 0,
          played: false
        },
        bating: {
          balls: 0,
          runs: 0,
          strikeRate: 0,
          zeros: 0,
          fours: 0,
          sixes: 0,
          played: false
        },
      })
    }
  }

  bowl() {
    if (this.currentBall <= (20 * 6) && this.currentBatsmanPosition < 10 && this.teams.teamA.score >= this.teams.teamB.score) {
      let score = this.scores[Math.floor(Math.random() * 10)];
      let bowlingTeam = (this.currentTeam == 'teamA') ? 'teamB' : 'teamA'
      console.log(this.currentBall, score, this.teams[this.currentTeam]["players"][this.currentBatsmanPosition], this.teams[bowlingTeam]["players"][this.currentBowlerPosition]);
      this.currentOverScores.push(score);

      this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.played = true;
      this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.played = true;
      if (score == 'nb' || score == 'wd') {
        this.teams[this.currentTeam]["score"] += 1;

        this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.runs += 1;
        this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.econ = (this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.runs) / ((this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.balls) / 6);

        if (score == 'nb') {
          this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.noBalls += 1;
        }
        if (score == 'wd') {
          this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.wides += 1;
        }


      } else {
        this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.balls += 1;
        this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.balls += 1;


        if (score == 'out') {
          this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.wicketBy = this.teams[bowlingTeam]["players"][this.currentBowlerPosition].name;
          this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.strikeRate = (this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.runs) / (this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.balls) * 100;
          //picking next batsman
          this.currentBatsmanPosition++;
          this.teams[this.currentTeam]["wickets"] += 1;
          this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.wickets += 1;
        } else {
          if (score == 0) {
            this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.zeros += 1;
            this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.zeros += 1;
          }
          // if (score == 2) {
          //   this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.twos += 1;
          //   this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.twos += 1;
          // }
          if (score == 4) {
            this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.fours += 1;
            this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.fours += 1;
          }
          if (score == 6) {
            this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.sixes += 1;
            this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.sixes += 1;
          }
          this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.runs += score;

          this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.runs += score;
          this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.strikeRate = (this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.runs) / (this.teams[this.currentTeam]["players"][this.currentBatsmanPosition].bating.balls) * 100;
          this.teams[this.currentTeam]["score"] += score;
        }
        this.teams[this.currentTeam]["balls"] += 1;

        this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.econ = (this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.runs) / ((this.teams[bowlingTeam]["players"][this.currentBowlerPosition].bowling.balls) / 6);

        if (this.currentBall % 6 == 0) {
          this.teams[this.currentTeam]["overwise"].push(this.currentOverScores.join(' '));
          this.currentOverScores = [];
          this.currentOver++;

          //picking next bowler
          this.getNewBowler();
        } else if (this.currentBatsmanPosition == 10) {
          this.teams[this.currentTeam]["overwise"].push(this.currentOverScores.join(' '));
          this.currentOverScores = [];
        }

        this.currentBall++;
      }
    } else {
      if (this.currentOverScores.length) {
        this.teams[this.currentTeam]["overwise"].push(this.currentOverScores.join(' '));
        this.currentOverScores = [];
      }
      this.currentBall = 1;
      if (this.currentTeam == 'teamA') {
        this.currentTeam = "teamB";
      } else {
        this.currentTeam = '';
        if (this.teams.teamA.score == this.teams.teamB.score) {
          this.result = "Draw";
        } else if (this.teams.teamA.score > this.teams.teamB.score) {
          this.result = "TeamA own the match";
        } else {
          this.result = "TeamB own the match";
        }
      }
      this.currentOver = 1;
      this.buttonName = "Start";
      delete this.currentBowlerPosition;
      delete this.currentBatsmanPosition;
      if (this.bowlInterval) {
        clearInterval(this.bowlInterval)
      }
      // console.log(this.teams)
    }
  }

  startInterval() {
    this.bowlInterval = setInterval(() => {
      this.bowl();
    }, 1000);
  }

  getNewBowler() {
    let randomPosition = Math.floor(Math.random() * 10);
    if (randomPosition == this.currentBowlerPosition) {
      if (randomPosition == 9) {
        this.currentBowlerPosition = 8;
      } else {
        this.currentBowlerPosition = randomPosition++;
      }
    } else {
      this.currentBowlerPosition = randomPosition;
    }
  }

  startGame(): void {
    if (this.currentTeam == "teamA") {
      this.teamAdata = true;
    }
    if (this.currentTeam == "teamB") {
      this.teamBdata = true;
    }
    if (typeof this.currentBatsmanPosition == 'undefined') {
      this.currentBatsmanPosition = 0;
    }
    if (typeof this.currentBowlerPosition == 'undefined') {
      this.getNewBowler();
    }
    if (this.buttonName == 'Start') {
      this.buttonName = "Stop";
      console.log('Game started');
      this.startInterval();
    } else {
      if (this.bowlInterval) {
        clearInterval(this.bowlInterval)
      }
      this.buttonName = "Start";
      console.log('Game Stopped');

    }
  }

  ngOnInit(): void {
    this.generatePlayers("teamA");
    this.generatePlayers("teamB");
  }

  ballsToOver(value) {
    return Math.floor(value / 6) + "." + (value % 6);
  }

}



export class player {
  name: string;
  bowling: {
    balls: number,
    overs: number,
    runs: number,
    wickets: number,
    econ: number,
    zeros: number,
    fours: number,
    sixes: number,
    wides: number,
    noBalls: number,
    played: boolean
  };
  bating: {
    balls: number,
    runs: number,
    wicketBy: string,
    strikeRate: number,
    zeros: number,
    fours: number,
    sixes: number,
    played: boolean
  };
}
