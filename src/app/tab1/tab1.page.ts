import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';

interface Resultado {
  valor: number;
  multiplos: number[];
  color: string;
  base: number;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  numero: number | null = null; // Permitir que sea null
  resultado: Resultado[] = []; // Cambiamos a 'Resultado[]' para más tipo seguro
  historial: { numero: number; resultado: number[] }[] = []; // Array para guardar el historial
  secuencia: string = ''; // Para almacenar la secuencia de números

  constructor(private toastController: ToastController, private db: AngularFireDatabase) {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }

  async calcularMultiplos() {
    this.resultado = []; // Reiniciar resultado antes de calcular
    this.secuencia = ''; // Reiniciar la secuencia

    if (this.numero) {
      // Generar la secuencia de 0 hasta el número ingresado
      this.secuencia = Array.from({ length: this.numero + 1 }, (_, i) => i).join(',');

      // Calcular los múltiplos de 3, 5 y 7
      const multiplos3 = this.obtenerMultiplos(3);
      const multiplos5 = this.obtenerMultiplos(5);
      const multiplos7 = this.obtenerMultiplos(7);

      // Agregar los resultados al array con su color correspondiente
      this.resultado.push({ valor: this.numero, multiplos: multiplos3, color: 'green', base: 3 });
      this.resultado.push({ valor: this.numero, multiplos: multiplos5, color: 'red', base: 5 });
      this.resultado.push({ valor: this.numero, multiplos: multiplos7, color: 'blue', base: 7 });

      // Mostrar el toast
      await this.presentToast('Resultados calculados.');
    }
  }

  // Función para obtener múltiplos de un número ingresado por el usuario
  obtenerMultiplos(base: number): number[] {
    const multiplos = [];
    for (let i = 1; i <= this.numero!; i++) {
      if (i % base === 0) {
        multiplos.push(i);
      }
    }
    return multiplos;
  }

  async guardarHistorial() {
    if (this.numero && this.resultado.length > 0) {
      const resultadosMultiplo = this.resultado.map(res => ({
        base: res.base,
        multiplos: res.multiplos,
        color: res.color
      }));

      const historialRef = this.db.list('historial');
      await historialRef.push({
        numero: this.numero,
        resultados: resultadosMultiplo,
        fecha: new Date().toISOString()
      });

      console.log('Historial guardado en Firebase:', {
        numero: this.numero,
        resultados: resultadosMultiplo
      });
      this.numero = null;
      this.resultado = [];
      this.secuencia = '';

      await this.presentToast('Historial guardado en Firebase.');
    }
  }
}
