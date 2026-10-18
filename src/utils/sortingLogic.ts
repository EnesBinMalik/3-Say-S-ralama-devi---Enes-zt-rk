import { SortingResult, SortStep, ProgrammingLanguage } from '../types';

export function solveSorting(n1: number, n2: number, n3: number): SortingResult {
  const original: [number, number, number] = [n1, n2, n3];
  const steps: SortStep[] = [];

  let a = n1;
  let b = n2;
  let c = n3;
  let currentArray = [a, b, c];

  // Adım 1: a ve b karşılaştırması
  const comp1 = a > b;
  steps.push({
    stepNumber: 1,
    title: '1. ve 2. Sayının Karşılaştırılması',
    comparison: `Sayı 1 (${a}) > Sayı 2 (${b})`,
    condition: `${a} > ${b}`,
    result: comp1,
    explanation: comp1
      ? `${a}, ${b}'den büyük olduğu için yer değiştirildi (Swap işlemi yapıldı).`
      : `${a}, ${b}'den büyük olmadığı için yerleri korunur (${a} ≤ ${b}).`,
    stateSnapshot: comp1 ? [b, a, c] : [a, b, c],
  });

  if (comp1) {
    const temp = a;
    a = b;
    b = temp;
  }
  currentArray = [a, b, c];

  // Adım 2: a ve c karşılaştırması (En küçük sayıyı en başa sabitleme)
  const comp2 = a > c;
  steps.push({
    stepNumber: 2,
    title: '1. ve 3. Sayının Karşılaştırılması',
    comparison: `Sayı 1 (${a}) > Sayı 3 (${c})`,
    condition: `${a} > ${c}`,
    result: comp2,
    explanation: comp2
      ? `${a}, ${c}'den büyük olduğu için yer değiştirildi. Böylece en küçük sayı (${c}) 1. sıraya geçti.`
      : `${a}, ${c}'den küçük veya eşit olduğu için 1. sıra korundu.`,
    stateSnapshot: comp2 ? [c, b, a] : [a, b, c],
  });

  if (comp2) {
    const temp = a;
    a = c;
    c = temp;
  }
  currentArray = [a, b, c];

  // Adım 3: b ve c karşılaştırması (Kalan iki sayıyı sıralama)
  const comp3 = b > c;
  steps.push({
    stepNumber: 3,
    title: '2. ve 3. Sayının Karşılaştırılması',
    comparison: `Sayı 2 (${b}) > Sayı 3 (${c})`,
    condition: `${b} > ${c}`,
    result: comp3,
    explanation: comp3
      ? `${b}, ${c}'den büyük olduğu için yer değiştirildi. Böylece ortanca ve en büyük sayılar belirlendi.`
      : `${b}, ${c}'den küçük veya eşit olduğu için sıra korundu (${b} ≤ ${c}).`,
    stateSnapshot: comp3 ? [a, c, b] : [a, b, c],
  });

  if (comp3) {
    const temp = b;
    b = c;
    c = temp;
  }

  const sorted: [number, number, number] = [a, b, c];

  // Identify original labels
  const originalItems = [
    { label: 'Sayı 1 (A)', val: n1 },
    { label: 'Sayı 2 (B)', val: n2 },
    { label: 'Sayı 3 (C)', val: n3 },
  ];

  const sortedWithLabels = sorted.map((val, idx) => {
    const match = originalItems.find(item => item.val === val);
    return {
      label: idx === 0 ? 'En Küçük (1.)' : idx === 1 ? 'Ortanca (2.)' : 'En Büyük (3.)',
      value: val,
      originalLabel: match ? match.label : `Değer`,
    };
  });

  // Relation string: e.g. "3 < 7 <= 9" or "5 = 5 = 5"
  const rel1 = sorted[0] === sorted[1] ? '=' : '<';
  const rel2 = sorted[1] === sorted[2] ? '=' : '<';
  const relationString = `${sorted[0]} ${rel1} ${sorted[1]} ${rel2} ${sorted[2]}`;

  const sum = n1 + n2 + n3;
  const average = Number((sum / 3).toFixed(2));
  const range = sorted[2] - sorted[0];
  const hasDuplicates = n1 === n2 || n2 === n3 || n1 === n3;
  const allEqual = n1 === n2 && n2 === n3;

  return {
    original,
    sorted,
    sortedWithLabels,
    relationString,
    min: sorted[0],
    median: sorted[1],
    max: sorted[2],
    sum,
    average,
    range,
    hasDuplicates,
    allEqual,
    steps,
  };
}

export function generateCode(lang: ProgrammingLanguage, num1: number, num2: number, num3: number): string {
  switch (lang) {
    case 'c':
      return `/*
 * ÖDEV: Girilen 3 Sayıyı Küçükten Büyüğe Sıralama
 * HAZIRLAYAN: Enes Öztürk
 * DİL: C (Standart C99)
 */

#include <stdio.h>

int main() {
    double a, b, c;
    double temp;

    printf("=========================================\\n");
    printf("   3 SAYIYI KUCUKTEN BUYUGE SIRALAMA     \\n");
    printf("        Hazirlayan: Enes Ozturk          \\n");
    printf("=========================================\\n");

    // Kullanıcıdan 3 sayı al
    printf("1. Sayiyi giriniz (A): ");
    scanf("%lf", &a);
    printf("2. Sayiyi giriniz (B): ");
    scanf("%lf", &b);
    printf("3. Sayiyi giriniz (C): ");
    scanf("%lf", &c);

    // Algoritma: Gecici degisken (temp) ile yer degistirme (Swap)
    // 1. Adim: a > b ise yer degistir
    if (a > b) {
        temp = a;
        a = b;
        b = temp;
    }

    // 2. Adim: a > c ise yer degistir (en kucuk sayi a olur)
    if (a > c) {
        temp = a;
        a = c;
        c = temp;
    }

    // 3. Adim: b > c ise yer degistir
    if (b > c) {
        temp = b;
        b = c;
        c = temp;
    }

    // Sonucu ekrana yazdir
    printf("\\n>>> KUCUKTEN BUYUGE SIRALAMA SONUCU: <<<\\n");
    printf("%.2f <= %.2f <= %.2f\\n", a, b, c);

    return 0;
}`;

    case 'cpp':
      return `/*
 * ÖDEV: Girilen 3 Sayıyı Küçükten Büyüğe Sıralama
 * HAZIRLAYAN: Enes Öztürk
 * DİL: C++
 */

#include <iostream>
#include <algorithm>

using namespace std;

int main() {
    cout << "=========================================" << endl;
    cout << "   3 SAYIYI KUCUKTEN BUYUGE SIRALAMA     " << endl;
    cout << "        Hazirlayan: Enes Ozturk          " << endl;
    cout << "=========================================" << endl;

    double s1, s2, s3;
    cout << "1. Sayiyi giriniz: ";
    cin >> s1;
    cout << "2. Sayiyi giriniz: ";
    cin >> s2;
    cout << "3. Sayiyi giriniz: ";
    cin >> s3;

    // Karsilastirma ve yer degistirme
    if (s1 > s2) swap(s1, s2);
    if (s1 > s3) swap(s1, s3);
    if (s2 > s3) swap(s2, s3);

    cout << "\\nSiralama: " << s1 << " <= " << s2 << " <= " << s3 << endl;

    return 0;
}`;

    case 'python':
      return `# =========================================
# ÖDEV: Girilen 3 Sayıyı Küçükten Büyüğe Sıralama
# HAZIRLAYAN: Enes Öztürk
# DİL: Python 3
# =========================================

def uclu_sirala(a, b, c):
    """
    3 sayıyı karşılaştırma mantığıyla küçükten büyüğe sıralar.
    Hazırlayan: Enes Öztürk
    """
    # 1. Adım: a ve b karşılaştırması
    if a > b:
        a, b = b, a

    # 2. Adım: a ve c karşılaştırması (en küçük başa geçer)
    if a > c:
        a, c = c, a

    # 3. Adım: b ve c karşılaştırması
    if b > c:
        b, c = c, b

    return a, b, c

# Ana Program
if __name__ == "__main__":
    print("=" * 45)
    print("   3 SAYIYI KÜÇÜKTEN BÜYÜĞE SIRALAMA")
    print("       Hazırlayan: Enes Öztürk")
    print("=" * 45)

    try:
        sayi1 = float(input("1. Sayıyı giriniz: "))
        sayi2 = float(input("2. Sayıyı giriniz: "))
        sayi3 = float(input("3. Sayıyı giriniz: "))

        kucuk, orta, buyuk = uclu_sirala(sayi1, sayi2, sayi3)

        print("\\n[SONUÇ] Küçükten Büyüğe:")
        print(f"{kucuk} <= {orta} <= {buyuk}")
    except ValueError:
        print("Lütfen geçerli bir sayı giriniz!")
`;

    case 'java':
      return `/*
 * ÖDEV: Girilen 3 Sayıyı Küçükten Büyüğe Sıralama
 * HAZIRLAYAN: Enes Öztürk
 * DİL: Java
 */

import java.util.Scanner;

public class UcSayiSirala {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        System.out.println("=========================================");
        System.out.println("   3 SAYIYI KUCUKTEN BUYUGE SIRALAMA     ");
        System.out.println("        Hazirlayan: Enes Ozturk          ");
        System.out.println("=========================================");

        System.out.print("1. Sayi: ");
        double a = scan.nextDouble();

        System.out.print("2. Sayi: ");
        double b = scan.nextDouble();

        System.out.print("3. Sayi: ");
        double c = scan.nextDouble();

        double temp;

        // Adim 1
        if (a > b) {
            temp = a;
            a = b;
            b = temp;
        }

        // Adim 2
        if (a > c) {
            temp = a;
            a = c;
            c = temp;
        }

        // Adim 3
        if (b > c) {
            temp = b;
            b = c;
            c = temp;
        }

        System.out.println("\\nKucukten Buyuge Siralama:");
        System.out.println(a + " <= " + b + " <= " + c);

        scan.close();
    }
}`;

    case 'csharp':
      return `/*
 * ÖDEV: Girilen 3 Sayıyı Küçükten Büyüğe Sıralama
 * HAZIRLAYAN: Enes Öztürk
 * DİL: C# (.NET)
 */

using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("=========================================");
        Console.WriteLine("   3 SAYIYI KÜÇÜKTEN BÜYÜĞE SIRALAMA     ");
        Console.WriteLine("        Hazırlayan: Enes Öztürk          ");
        Console.WriteLine("=========================================");

        Console.Write("1. Sayıyı giriniz: ");
        double a = Convert.ToDouble(Console.ReadLine());

        Console.Write("2. Sayıyı giriniz: ");
        double b = Convert.ToDouble(Console.ReadLine());

        Console.Write("3. Sayıyı giriniz: ");
        double c = Convert.ToDouble(Console.ReadLine());

        // Sıralama Algoritması
        if (a > b) { double t = a; a = b; b = t; }
        if (a > c) { double t = a; a = c; c = t; }
        if (b > c) { double t = b; b = c; c = t; }

        Console.WriteLine($"\\nKüçükten Büyüğe Sıralama: {a} <= {b} <= {c}");
    }
}`;

    case 'javascript':
      return `/**
 * ÖDEV: Girilen 3 Sayıyı Küçükten Büyüğe Sıralama
 * HAZIRLAYAN: Enes Öztürk
 * DİL: JavaScript (Node.js / ES6)
 */

function siralaUcSayi(a, b, c) {
  let [s1, s2, s3] = [a, b, c];

  if (s1 > s2) [s1, s2] = [s2, s1];
  if (s1 > s3) [s1, s3] = [s3, s1];
  if (s2 > s3) [s2, s3] = [s3, s2];

  return [s1, s2, s3];
}

// Test örneği:
const s1 = ${num1};
const s2 = ${num2};
const s3 = ${num3};

const sonuc = siralaUcSayi(s1, s2, s3);
console.log("Hazırlayan: Enes Öztürk");
console.log(\`Sıralama: \${sonuc.join(" <= ")}\`);
`;

    case 'pseudocode':
      return `ALGORİTMA: UcSayiyiKucuktenBuyugeSirala
YAZAR: Enes Öztürk
KONU: 3 Sayıyı Küçükten Büyüğe Sıralama Ödevi

BAŞLA
  DEĞİŞKENLER:
    a, b, c, gecici : Reel Sayı

  GİRİŞ:
    YAZ "1. Sayıyı giriniz (a):"
    OKU a
    YAZ "2. Sayıyı giriniz (b):"
    OKU b
    YAZ "3. Sayıyı giriniz (c):"
    OKU c

  İŞLEM (KARŞILAŞTIRMA VE YER DEĞİŞTİRME):
    EĞER (a > b) İSE
      gecici = a
      a = b
      b = gecici
    EĞER_SONU

    EĞER (a > c) İSE
      gecici = a
      a = c
      c = gecici
    EĞER_SONU

    EĞER (b > c) İSE
      gecici = b
      b = c
      c = gecici
    EĞER_SONU

  ÇIKIŞ:
    YAZ "Küçükten büyüğe sıralama:"
    YAZ a, " <= ", b, " <= ", c
    YAZ "Hazırlayan: Enes Öztürk"

BİTİR`;

    default:
      return '';
  }
}
