# Babu Mashu - Local AI Telegram Bot 🤖

Bot Telegram asik dan gaul yang berjalan 100% secara lokal di komputermu, ditenagai oleh Ollama (AI)! Tanpa perlu server cloud, ngrok, atau webhook ribet. 

## Persiapan (Prerequisites)

Sebelum mulai, pastikan kamu sudah menginstal:
1. [Node.js](https://nodejs.org/) (terbaru).
2. [Ollama](https://ollama.com/) (pastikan sudah running di background).

## Cara Setup

1. **Dapatkan Token Telegram**
   - Buka aplikasi Telegram, cari dan chat **[@BotFather](https://t.me/BotFather)**.
   - Ketik `/newbot`, ikuti petunjuknya sampai kamu mendapatkan **API Token** (contoh: `123456789:ABCDefghI...`).

2. **Atur File Environment (.env)**
   - Copy atau rename file `.env.example` menjadi `.env`.
   - Buka file `.env` dan masukkan API Token yang kamu dapatkan tadi:
     ```env
     BOT_TOKEN=token_dari_botfather_masukkan_kesini
     OLLAMA_MODEL=qwen2.5:3b
     BOT_NAME=mashu
     ```
   - `BOT_TOKEN`: Token API bot Telegram kamu.
   - `OLLAMA_MODEL`: Nama model AI yang kamu pakai (bebas, asal sudah didownload di Ollama).
   - `BOT_NAME`: Kata panggilan untuk trigger bot ketika ngobrol di dalam grup.

3. **Install Dependencies**
   - Buka terminal/CMD di folder project ini, lalu jalankan:
     ```bash
     npm install
     ```

4. **Siapkan Model Ollama**
   - Secara default, bot ini menggunakan model `qwen2.5:3b`. Pastikan kamu sudah mendownloadnya di Ollama:
     ```bash
     ollama run qwen2.5:3b
     ```
   - *(Opsional)* Jika kamu ingin menggunakan model lain (misal: `llama3` atau `mistral`), silakan buka `index.js` dan ubah teks `model: 'qwen2.5:3b'` dengan nama model pilihanmu.

5. **Jalankan Bot! 🚀**
   - Di terminal, ketik perintah berikut:
     ```bash
     node index.js
     ```
   - Kalau muncul tulisan `Local AI Bot is running...`, selamat! Bot-mu sudah siap diajak ngobrol.

## Fitur
- **Private Chat**: Ngobrol bebas dan santai 1 lawan 1.
- **Group Chat**: Masukkan bot ke dalam grup! Bot hanya akan merespons jika kamu me-*reply* pesannya, me-*mention* username-nya, atau menyebutkan panggilan "mashu". Tidak akan nyampah di grup!
- **Persona Qwen**: Bot diset dengan gaya bahasa gaul, asik, humoris, dan santai seperti teman nongkrong.
