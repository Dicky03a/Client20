# Panduan Konfigurasi dan Instalasi Proyek


## 🛠️ Persyaratan Sistem (Prerequisites)

Sebelum memulai proses instalasi, pastikan sistem Anda telah memenuhi persyaratan perangkat lunak berikut:

1. **PHP**: Versi `^8.2` atau terbaru
2. **Composer**: Versi `2.x`
3. **Node.js**: Versi `18.x` atau terbaru (berserta `npm`, `yarn`, atau `pnpm`)
4. **Database**: MySQL, PostgreSQL, atau SQLite (Pilih salah satu)
5. **Git**: Untuk manajemen versi kontrol (opsional jika mengunduh zip)

---

## 🚀 Langkah Instalasi

Silakan ikuti langkah-langkah di bawah ini secara berurutan untuk memasang proyek di mesin lokal Anda.

### 1. Kloning Repositori
Lakukan kloning repositori dari sumber Git Anda ke direktori lokal:
```bash
git clone <URL_REPOSITORI>
cd Client20
```
*(Catatan: Ganti `<URL_REPOSITORI>` dengan tautan git proyek Anda yang sebenarnya).*

### 2. Instalasi Dependensi Backend (PHP)
Gunakan Composer untuk menginstal semua library PHP / Laravel yang dibutuhkan:
```bash
composer install
```

### 3. Instalasi Dependensi Frontend (Node.js)
Gunakan pengelola paket Node pilihan Anda (NPM direkomendasikan karena digunakan pada _script_ bawaan):
```bash
npm install
```

### 4. Konfigurasi Environment (`.env`)
Salin file konfigurasi bawaan ke dalam file khusus pengembangan menggunakan perintah:
```bash
cp .env.example .env
```
*(Pada Windows, Anda bisa menggunakan `copy .env.example .env` atau menyalinnya secara manual dari File Explorer).*

### 5. Generate Application Key
Langkah wajib untuk Laravel adalah mengatur _encryption key_ pada file `.env` untuk keamanan data sesi dan enkripsi:
```bash
php artisan key:generate
```

### 6. Pengaturan Database
Buka file `.env` yang baru saja disalin lalu cari baris berikut:
```env
DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=
```
Sesuaikan nilai `DB_CONNECTION`, pengaturan dari host, port, database, username, hingga password sesuai dengan database yang Anda gunakan (contoh menggunakan `mysql` atau `pgsql`). Jika Anda memutuskan menggunakan `sqlite`, pastikan Anda telah membuat atau mengizinkan _file_ `database/database.sqlite` dibuat agar tidak terjadi _error_.

### 7. Migrasi Database dan Seeder
Setelah `.env` terkonfigurasi pada _database server_ Anda, jalankan _migration_ beserta data dummy / bawaannya (_seeder_):
```bash
php artisan migrate --seed
```
*(Proses ini juga akan memasukkan data penting seperti _Role & Permission_ bawaan dari package Spatie Permission jika telah diatur di Seeder).*

### 8. Storage Link (Opsional namun disarankan)
Jika proyek Anda menggunakan sistem manajemen atau _upload_ _file/image_, Anda perlu mentautkan folder storage publik (berlaku untuk Local file system):
```bash
php artisan storage:link
```

---

## 💻 Menjalankan Aplikasi di Lingkungan Lokal (Development Phase)

Proyek ini menggunakan Vite untuk kompilasi _asset_ frontend dan Laravel _built-in server_ untuk backend. Aplikasi telah dipersingkat melalui _script_ dalam `composer.json` di mana Anda dapat menjalankan **Laravel server, _queue_, server _log_, hingga kompilasi Vite** secara bersamaan.

Jalankan perintah berikut pada terminal:
```bash
composer run dev
```
*(Atau Anda bisa secara manual membuka 2 terminal baru berturut-turut menjalankan: `php artisan serve` & `npm run dev`)*.

Aplikasi sekarang dapat diakses melalui browser Anda di tautan standar: [http://localhost:8000](http://localhost:8000).

---

## 🧪 Pengujian (Testing)

Proyek ini telah dikonfigurasikan agar dapat menggunakan pengujian berorientasi ekspresif melalui kerangka peranti **Pest PHP**. Anda dapat menjalankan semua skenario _test_ (Feature & Unit test) dengan:

```bash
php artisan test
# Atau juga bisa dengan eksekusi langsung test runner pest
./vendor/bin/pest
```

Pastikan *environment variables* untuk _testing_ (`phpunit.xml` atau `.env.testing` bila ada) telah dikonfigurasi dan tersambung pada database pengujian Anda.

---

## 🧰 Analisis Statis dan Format Kode

Untuk menjaga kualitas dan gaya tata struktur agar konsisten, proyek dilengkapi ESLint dan Prettier (Frontend).
Memeriksa format secara manual:
```bash
npm run lint
npm run format:check
```
Memperbaiki format (auto-fix) secara langsung:
```bash
npm run format
```
