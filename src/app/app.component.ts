import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  workDurationMinutes: number = 25; // Definido como 25 minutos por padrão
  workDuration: number = this.workDurationMinutes * 60; // Convertendo para segundos
  shortBreak: number = 60 * 5; // 5 minutos
  longBreak: number = 60 * 15; // 15 minutos
  timer: any;
  timeLeft: number = this.workDuration;
  currentSession: string = 'Trabalho';
  workSessions: number = 0;
  isRunning: boolean = false;
  isPaused: boolean = false;

  timerDisplay: string = this.formatTime(this.timeLeft);

  @ViewChild('alarmSound', { static: false }) alarmSound!: ElementRef;


  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  }

  setWorkTime() {
    if (this.workDurationMinutes > 0) {
      this.workDuration = this.workDurationMinutes * 60;
      this.timeLeft = this.workDuration;
      this.timerDisplay = this.formatTime(this.timeLeft);
    }
  }

  startTimer() {
    this.alarmSound.nativeElement.play().catch((error: any) => {
      console.log('Autoplay bloqueado. Interação necessária.', error);
    });
    this.isRunning = true;
    this.isPaused = false;

    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.timerDisplay = this.formatTime(this.timeLeft);
      } else {
        clearInterval(this.timer);
        this.alarmSound.nativeElement.play();   
        this.handleSessionSwitch();
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.isRunning = false;
    this.isPaused = true;
  }

  resumeTimer() {
    this.startTimer();
  }

  resetTimer() {
    clearInterval(this.timer);
    this.timeLeft = this.workDuration;
    this.currentSession = 'Trabalho';
    this.workSessions = 0;
    this.timerDisplay = this.formatTime(this.timeLeft);
    this.isRunning = false;
    this.isPaused = false;
  }

  handleSessionSwitch() {
    if (this.currentSession === 'Trabalho') {
      this.workSessions++;
      console.log('Work session completed. Total:', this.workSessions);

      if (this.workSessions % 4 === 0) {
        this.currentSession = 'Pausa Longa';
        this.timeLeft = this.longBreak;
      } else {
        this.currentSession = 'Pausa Pequena';
        this.timeLeft = this.shortBreak;
      }
    } else {
      this.currentSession = 'Trabalho';
      this.timeLeft = this.workDuration;
    }

    this.timerDisplay = this.formatTime(this.timeLeft);

    this.startTimer();
  }


  addFiveMinutes() {
    this.timeLeft += 5 * 60;
    this.timerDisplay = this.formatTime(this.timeLeft);
  }

  removeFiveMinutes() {
    if (this.timeLeft > 5 * 60) {
      this.timeLeft -= 5 * 60;
    } else {
      this.timeLeft = 0;
    }
    this.timerDisplay = this.formatTime(this.timeLeft);
  }
}
