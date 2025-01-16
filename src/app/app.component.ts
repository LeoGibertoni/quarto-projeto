import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  workDurationMinutes: number = 25; // Definido como 25 minutos por padrão
  workDuration: number = this.workDurationMinutes * 60; // Convertendo para segundos
  shortBreak: number = 5 * 60; // 5 minutos
  longBreak: number = 15 * 60; // 15 minutos
  timer: any;
  timeLeft: number = this.workDuration;
  currentSession: string = 'Trabalho';
  workSessions: number = 0;
  isRunning: boolean = false;
  isPaused: boolean = false;

  timerDisplay: string = this.formatTime(this.timeLeft);

  @ViewChild('alarmSound') alarmSound!: ElementRef;

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  }

  // Método para definir o tempo de trabalho conforme o valor inserido pelo usuário
  setWorkTime() {
    if (this.workDurationMinutes > 0) {
      this.workDuration = this.workDurationMinutes * 60; // Convertendo para segundos
      this.timeLeft = this.workDuration;
      this.timerDisplay = this.formatTime(this.timeLeft);
    }
  }

  startTimer() {
    this.isRunning = true;
    this.isPaused = false;
    this.timer = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.timerDisplay = this.formatTime(this.timeLeft);
      } else {
        clearInterval(this.timer); // Para o temporizador quando o tempo acaba
        this.alarmSound.nativeElement.play(); // Toca o som do alarme
        this.handleSessionSwitch(); // Alterna para a próxima sessão e ajusta o contador
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
      this.workSessions++; // Incrementa a sessão de trabalho
      console.log('Work session completed. Total:', this.workSessions);

      // Alterna para pausa curta ou longa, dependendo do número de sessões
      if (this.workSessions % 4 === 0) {
        this.currentSession = 'Pausa Longa'; // A cada 4 sessões de trabalho, vai para a pausa longa
        this.timeLeft = this.longBreak;
      } else {
        this.currentSession = 'Pausa Pequena'; // Caso contrário, vai para a pausa curta
        this.timeLeft = this.shortBreak;
      }
    } else {
      this.currentSession = 'Work';
      this.timeLeft = this.workDuration;
    }

    this.timerDisplay = this.formatTime(this.timeLeft);

    // Aqui, o startTimer() deve ser chamado após definir o tempo correto para a nova sessão
    this.startTimer(); // Inicia o temporizador para a nova sessão
  }


  addFiveMinutes() {
    this.timeLeft += 5 * 60; // Adiciona 5 minutos em segundos
    this.timerDisplay = this.formatTime(this.timeLeft); // Atualiza a exibição do cronômetro
  }

  removeFiveMinutes() {
    if (this.timeLeft > 5 * 60) {
      this.timeLeft -= 5 * 60; // Remove 5 minutos em segundos
    } else {
      this.timeLeft = 0; // Garante que o tempo não fique negativo
    }
    this.timerDisplay = this.formatTime(this.timeLeft); // Atualiza a exibição do cronômetro
  }
}
