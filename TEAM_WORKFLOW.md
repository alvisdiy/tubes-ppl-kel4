# ARTORA — Panduan Alur Kerja Tim & Pembagian Tugas (`TEAM_WORKFLOW.md`)

> **Dokumen Resmi Kolaborasi & Manajemen Proyek Tim**  
> **Proyek:** ARTORA — Art Collection Explorer  
> **Referensi Desain:** [`DESIGN.md`](./DESIGN.md) | **Panduan Setup:** [`README.md`](./README.md)  
> **Dokumentasi API:** [Art Institute of Chicago Public API](https://api.artic.edu/docs/)

---

## Daftar Isi

1. [Gambaran Umum Proyek](#1-gambaran-umum-proyek)
2. [Struktur Tim](#2-struktur-tim)
3. [Rincian Tugas per Anggota](#3-rincian-tugas-per-anggota)
4. [Kepemilikan File (File Ownership)](#4-kepemilikan-file-file-ownership)
5. [Alur Kerja GitHub & Branch](#5-alur-kerja-github--branch)
6. [Panduan Pull Request (PR)](#6-panduan-pull-request-pr)
7. [Strategi Integrasi & Penanganan Konflik](#7-strategi-integrasi--penanganan-konflik)
8. [Linimasa Proyek 2 Minggu (14 Hari)](#8-linimasa-proyek-2-minggu-14-hari)
9. [Kriteria Penyelesaian (Definition of Done)](#9-kriteria-penyelesaian-definition-of-done)
10. [Aturan Komunikasi Tim](#10-aturan-komunikasi-tim)

---

## 1. Gambaran Umum Proyek

| Informasi | Detail |
| :--- | :--- |
| **Nama Proyek** | ARTORA — Art Collection Explorer |
| **Tagline** | *"Discover Art. Explore Stories."* |
| **Penyedia API** | Art Institute of Chicago (`https://api.artic.edu/api/v1`) |
| **Dokumentasi API** | `https://api.artic.edu/docs/` |
| **Referensi Desain** | [`DESIGN.md`](./DESIGN.md) (Single Source of Truth untuk seluruh UI) |
| **Tech Stack** | React, Vite, JavaScript, Tailwind CSS v4, React Router DOM, Axios, Lucide React, GitHub |

### Filosofi Branch `main`

Branch `main` adalah **fondasi teknis bersama** yang selalu stabil dan dapat di-build (`npm run build`).

| Yang **ADA** di `main` (Fondasi Awal) | Yang **TIDAK BOLEH** langsung dibuat di `main` |
| :--- | :--- |
| Konfigurasi React + Vite (`vite.config.js`, `src/main.jsx`) | Halaman Homepage yang sudah jadi |
| Konfigurasi Tailwind CSS v4 & token warna (`src/index.css`) | Halaman Artwork Explorer yang sudah jadi |
| Konfigurasi dasar React Router (`src/App.jsx`) | Halaman Artist Explorer yang sudah jadi |
| Konfigurasi terpusat Axios (`src/services/api.js`) | Halaman Artwork Detail yang sudah jadi |
| Fondasi service API (`artworkService.js`, `artistService.js`, `imageHelper.js`) | Implementasi fitur/komponen selesai tanpa Pull Request |
| Struktur folder bersama, `README.md`, `DESIGN.md`, `TEAM_WORKFLOW.md` | Eksperimen atau kode setengah jadi |

Seluruh pengembangan fitur aplikasi **wajib** dilakukan di masing-masing *feature branch* dan masuk ke `main` melalui **Pull Request (PR)** yang telah direview.

---

## 2. Struktur Tim

Proyek ARTORA dikerjakan oleh **4 anggota tim** dengan pembagian peran dan branch yang tegas agar setiap anggota memiliki kontribusi kode yang terukur dan independen:

| Anggota | Peran | Feature Branch | Fokus Utama |
| :--- | :--- | :--- | :--- |
| **Alvis** | **Maintainer + Homepage Developer** | `feature/home-experience` | Homepage (Museum Entrance), arsitektur, layout & navigasi bersama, review PR, integrasi & deployment |
| **Risa** | **Artwork Explorer Developer** | `feature/artwork-explorer` | Halaman Exhibition Hall, galeri karya, `ArtworkCard`, pencarian, filter departemen/kategori, paginasi |
| **Imelda** | **Artist Explorer Developer** | `feature/artist-explorer` | Halaman Artist Archive, pencarian seniman, profil & biografi seniman, daftar karya terkait |
| **Nisfa** | **Artwork Detail Developer** | `feature/artwork-detail` | Halaman Private Viewing detail karya, tampilan gambar resolusi tinggi, label museum, metadata, karya terkait |

### Catatan Penting per Peran

- **Alvis (Maintainer):** Selain mengelola arsitektur, integrasi, dan review PR, Alvis **tetap wajib** memiliki kontribusi kode fitur individu yang jelas melalui branch `feature/home-experience`.
- **Imelda (Artist Explorer — Catatan API Penting):** Art Institute of Chicago API **tidak memiliki** endpoint `/artists`. Data seniman diakses melalui resource **`/agents`** dan **`/agents/search`** dengan filter `query[term][is_artist]=true` (sudah disiapkan di `src/services/artistService.js`).

---

## 3. Rincian Tugas per Anggota

### Alvis — Maintainer & Homepage Developer (`feature/home-experience`)

- **Tanggung Jawab Utama:**
  - Membangun pengalaman **Homepage — Museum Entrance** sesuai `DESIGN.md` Bagian 7A.
  - Membangun shell navigasi bersama (`MainLayout.jsx`, `Navbar.jsx`, `Footer.jsx`) dan tombol dasar (`PrimaryButton`, `SecondaryButton`).
  - Memelihara `App.jsx` (routing), `src/index.css` (design tokens), `src/services/api.js`, `README.md`, serta mereview PR dan melakukan integrasi akhir & deployment.
- **Checklist Tugas Detail:**
  - [ ] Membuat `MainLayout.jsx` dengan struktur `Navbar` + `<main>` + `Footer` yang mendukung mode hero *full-bleed* maupun konten `max-w-7xl`.
  - [ ] Membuat `Navbar.jsx` (varian light Warm Ivory dan varian overlay transparan di atas hero, lengkap dengan menu responsif mobile).
  - [ ] Membuat `Footer.jsx` dengan navigasi singkat dan atribusi resmi Art Institute of Chicago API.
  - [ ] Membangun Hero Section sinematik bertema pintu masuk museum (headline editorial serif, subjudul, tombol CTA `Explore Artworks`, dan bar pintasan pameran di bagian bawah).
  - [ ] Membangun bagian *Curated Artwork Highlights* dan *Exhibition Spotlight* menggunakan data asli dari API (bukan data mock statis).
  - [ ] Menghubungkan seluruh rute di `App.jsx` setelah PR anggota lain disetujui.
  - [ ] Mereview PR Risa, Imelda, dan Nisfa terhadap `DESIGN.md`.
- **Komponen & Halaman Wajib:**
  - Halaman: `src/pages/Home.jsx` (opsional: `src/pages/NotFound.jsx`).
  - Komponen: `src/layouts/MainLayout.jsx`, `src/components/Navbar.jsx`, `src/components/Footer.jsx`, serta komponen sub-homepage (mis. `src/components/home/HeroSection.jsx`, `src/components/home/FeaturedHighlights.jsx`).
- **Endpoint API yang Digunakan:**
  - `GET /artworks` (via `fetchArtworks` di `src/services/artworkService.js`) untuk *Featured Highlights*.
  - `GET /category-terms/search` (via `fetchCategoryTerms`) untuk pintasan departemen/pameran.
- **Deliverable:** Homepage museum yang imersif, navigasi lintas halaman yang konsisten, serta repo yang terintegrasi penuh dan ter-deploy.
- **Dependensi:** Tidak bergantung pada anggota lain untuk mulai mengerjakan Homepage; akan mengintegrasikan halaman Risa, Imelda, dan Nisfa ke `App.jsx` saat tahap integrasi.
- **Saran Milestone Commit:**
  1. `feat: add MainLayout, Navbar, and Footer museum shell`
  2. `feat: implement museum entrance hero and exhibition shortcuts`
  3. `feat: add curated artwork highlights fetched from AIC API`
  4. `style: refine homepage responsive spacing and motion per DESIGN.md`

---

### Risa — Artwork Explorer Developer (`feature/artwork-explorer`)

- **Tanggung Jawab Utama:**
  - Membangun halaman **Artwork Explorer — Exhibition Hall** (`/artworks`) sesuai `DESIGN.md` Bagian 7B.
  - Menyediakan pengalaman menjelajah koleksi karya dengan tampilan galeri museum, pencarian, filter departemen & kategori, dan paginasi.
- **Checklist Tugas Detail:**
  - [ ] Membangun `ArtworkCard.jsx` dengan mat/passe-partout `#EDE6DA`, `object-contain` agar proporsi karya tidak terpotong, tanpa overlay teks di atas gambar, serta fallback jika `image_id` kosong.
  - [ ] Membangun `SearchBar.jsx` yang dapat mengirim query pencarian ke API dan mendukung query URL (`?q=...`).
  - [ ] Membangun `FilterPanel.jsx` untuk filter berdasarkan **Department** (`department_id`) dan **Category** (`category_ids`), lengkap dengan chip filter aktif dan tombol reset.
  - [ ] Membangun `Pagination.jsx` dengan navigasi Previous/Next, angka halaman (`tabular-nums`), dan tampilan ringkas untuk mobile.
  - [ ] Mengimplementasikan state **Loading** (skeleton grid), **Error** (dengan tombol *Try Again*), dan **Empty** (dengan tombol *Reset Filters*).
  - [ ] Menghubungkan setiap `ArtworkCard` menuju `/artworks/:id`.
- **Komponen & Halaman Wajib:**
  - Halaman: `src/pages/ArtworkExplorer.jsx`.
  - Komponen: `src/components/ArtworkCard.jsx`, `src/components/SearchBar.jsx`, `src/components/FilterPanel.jsx`, `src/components/Pagination.jsx` (serta komponen state loading/error/empty untuk explorer).
- **Endpoint API yang Digunakan:**
  - `GET /artworks` (via `fetchArtworks`).
  - `GET /artworks/search` dengan parameter `q`, `query[term][department_id]`, `query[term][category_ids]` (via `searchArtworks`).
  - `GET /category-terms/search` dengan `subtype=department` dan `subtype=category` (via `fetchCategoryTerms`).
- **Deliverable:** Halaman Exhibition Hall yang responsif, bebas gaya e-commerce, dengan pencarian, filter, dan paginasi penuh dari API.
- **Dependensi:** Rute `/artworks` didaftarkan ke `App.jsx` bersama Alvis; link kartu mengarah ke `/artworks/:id` milik Nisfa.
- **Saran Milestone Commit:**
  1. `feat: create museum-style ArtworkCard with mat framing and fallback`
  2. `feat: build ArtworkExplorer grid with AIC API pagination`
  3. `feat: add artwork search and department/category filter panel`
  4. `feat: implement skeleton loading, error, and empty states`

---

### Imelda — Artist Explorer Developer (`feature/artist-explorer`)

- **Tanggung Jawab Utama:**
  - Membangun halaman **Artist Explorer — Artist Archive** (`/artists`) sesuai `DESIGN.md` Bagian 7C.
  - Menampilkan direktori seniman, pencarian seniman, informasi biografi & tahun hidup, serta karya terkait milik seniman yang dipilih.
- **Checklist Tugas Detail:**
  - [ ] Membangun `ArtistCard.jsx` dengan tampilan arsip editorial (nama seniman serif, rentang tahun `birth_date – death_date`, ringkasan biografi yang telah dibersihkan dari tag HTML via `stripHtml`, dan indikator kartu terpilih).
  - [ ] Mengimplementasikan pencarian seniman real-time / berbasis submit menggunakan `searchArtists`.
  - [ ] Menampilkan panel/bagian detail profil seniman terpilih (biografi lengkap, konteks historis/tahun hidup, fallback ramah bila biografi `null`).
  - [ ] Menampilkan daftar **Associated Artworks** milik seniman terpilih menggunakan `fetchArtworksByArtist` dengan tautan ke `/artworks/:id`.
  - [ ] Mengimplementasikan paginasi daftar seniman serta state **Loading**, **Error**, dan **Empty**.
- **Komponen & Halaman Wajib:**
  - Halaman: `src/pages/ArtistExplorer.jsx`.
  - Komponen: `src/components/ArtistCard.jsx` serta subkomponen khusus di `src/components/artists/` (mis. `ArtistProfilePanel.jsx`, `ArtistWorksList.jsx`).
- **Endpoint API yang Digunakan:**
  - `GET /agents/search?query[term][is_artist]=true` (via `searchArtists` di `src/services/artistService.js`).
  - `GET /agents/{id}` (via `fetchArtistById`).
  - `GET /artworks/search?query[term][artist_id]={artistId}` (via `fetchArtworksByArtist`).
- **Deliverable:** Halaman Artist Archive yang rapi, informatif, dan terhubung langsung ke data `/agents` serta karya terkait di AIC API.
- **Dependensi:** Dapat langsung dikembangkan mandiri; setelah `ArtworkCard.jsx` milik Risa masuk `main`, karya terkait seniman dapat memakai ulang `ArtworkCard` saat integrasi (atau kartu ringkas sementara di branch sendiri).
- **Saran Milestone Commit:**
  1. `feat: create ArtistCard component with lifespan and bio formatting`
  2. `feat: implement ArtistExplorer archive grid with agents API search`
  3. `feat: add artist biography profile view and associated artworks`
  4. `feat: add loading, error, empty states, and responsive polish`

---

### Nisfa — Artwork Detail Developer (`feature/artwork-detail`)

- **Tanggung Jawab Utama:**
  - Membangun halaman **Artwork Detail — Private Viewing** (`/artworks/:id`) sesuai `DESIGN.md` Bagian 7D.
  - Menghadirkan pengalaman menatap satu mahakarya secara fokus lengkap dengan label museum (*wall placard*), metadata lengkap, dan karya terkait.
- **Checklist Tugas Detail:**
  - [ ] Menampilkan gambar karya beresolusi tinggi (`getArtworkDetailUrl` — `843px` IIIF) dengan `object-contain` dan `max-h-[75vh]` di atas panggung galeri (`#EDE6DA` atau `#1A1614`) agar 100% komposisi terlihat tanpa terpotong.
  - [ ] Membangun komponen `ArtworkLabel.jsx` bergaya plakat dinding museum (departemen, judul serif, informasi seniman, tanggal pembuatan, medium, dimensi, kategori, klasifikasi, asal daerah, dan *credit line*).
  - [ ] Menampilkan deskripsi kuratorial (`description` / `short_description`) yang telah disanitasi dengan `stripHtml()`, dengan batas lebar baca `max-w-[65ch]`.
  - [ ] Menangani seluruh metadata `null`/kosong dan `image_id` kosong secara elegan tanpa merusak tata letak atau mengarang data.
  - [ ] Menampilkan bagian **Related Artworks** (hingga 4 karya dari departemen yang sama) menggunakan `fetchRelatedArtworks`.
  - [ ] Menyediakan tombol kembali (`← Back to Exhibition`), serta state **Loading** (detail skeleton) dan **Error** (termasuk penanganan ID tidak ditemukan / 404).
- **Komponen & Halaman Wajib:**
  - Halaman: `src/pages/ArtworkDetail.jsx`.
  - Komponen: `src/components/ArtworkLabel.jsx` serta subkomponen khusus di `src/components/artwork-detail/` (mis. `ArtworkStage.jsx`, `MetadataTable.jsx`, `RelatedArtworksSection.jsx`).
- **Endpoint API yang Digunakan:**
  - `GET /artworks/{id}` (via `fetchArtworkById` di `src/services/artworkService.js`).
  - `GET /artworks/search?query[term][department_id]={departmentId}` (via `fetchRelatedArtworks`).
- **Deliverable:** Halaman Private Viewing yang memprioritaskan visual karya sebelum metadata, tangguh terhadap data API yang tidak lengkap, dan responsif di semua ukuran layar.
- **Dependensi:** Rute `/artworks/:id` didaftarkan di `App.jsx` bersama Alvis; dapat diuji langsung dengan ID karya nyata AIC (contoh: `/artworks/27992` *A Sunday on La Grande Jatte* atau `/artworks/28560` *The Bedroom*).
- **Saran Milestone Commit:**
  1. `feat: build ArtworkDetail layout with uncropped high-res IIIF stage`
  2. `feat: create museum-style ArtworkLabel and metadata tombstone table`
  3. `feat: add curatorial description sanitization and null-safe fallbacks`
  4. `feat: implement related artworks section, loading skeleton, and 404 error state`

---

## 4. Kepemilikan File (File Ownership)

Untuk meminimalkan *merge conflict* di GitHub, setiap file dan direktori memiliki pemilik tunggal yang jelas:

| Pemilik | File & Direktori yang Dimiliki | Catatan |
| :--- | :--- | :--- |
| **Alvis (Maintainer)** | `src/pages/Home.jsx`, `src/pages/NotFound.jsx`, `src/layouts/MainLayout.jsx`, `src/components/Navbar.jsx`, `src/components/Footer.jsx`, `src/components/home/*`, `src/App.jsx`, `src/index.css`, `index.html`, `README.md`, `DESIGN.md` | Pemilik tunggal file konfigurasi, token warna, dan routing utama |
| **Risa** | `src/pages/ArtworkExplorer.jsx`, `src/components/ArtworkCard.jsx`, `src/components/SearchBar.jsx`, `src/components/FilterPanel.jsx`, `src/components/Pagination.jsx`, `src/components/explorer/*` | Boleh membuat subkomponen & CSS modular di dalam `src/components/explorer/` |
| **Imelda** | `src/pages/ArtistExplorer.jsx`, `src/components/ArtistCard.jsx`, `src/components/artists/*` | Boleh membuat subkomponen di dalam `src/components/artists/` |
| **Nisfa** | `src/pages/ArtworkDetail.jsx`, `src/components/ArtworkLabel.jsx`, `src/components/artwork-detail/*` | Boleh membuat subkomponen di dalam `src/components/artwork-detail/` |
| **File Bersama (Terpusat)** | `src/services/api.js`, `src/services/artworkService.js`, `src/services/artistService.js`, `src/utils/imageHelper.js`, `package.json` | Dikelola terpusat oleh **Alvis (Maintainer)**; perubahan dari anggota lain harus dikoordinasikan terlebih dahulu |

### Aturan Emas Kepemilikan File

1. **Jangan mengedit file milik anggota lain** tanpa izin tertulis di grup tim.
2. **Jangan mengubah `src/App.jsx` atau `src/index.css` secara sepihak** di beberapa branch sekaligus—jika perlu menguji halaman secara lokal, koordinasikan perubahan rute di `App.jsx` bersama Alvis saat tahap PR/integrasi.
3. Jika membutuhkan fungsi API baru di `src/services/`, sampaikan ke Maintainer agar kontrak fungsi disepakati terlebih dahulu sebelum diubah.

---

## 5. Alur Kerja GitHub & Branch

### Daftar Branch Resmi

- **Branch Utama:** `main` (terlindungi — hanya menerima kode melalui Pull Request yang disetujui).
- **Feature Branches:**
  - `feature/home-experience` (Alvis)
  - `feature/artwork-explorer` (Risa)
  - `feature/artist-explorer` (Imelda)
  - `feature/artwork-detail` (Nisfa)

### 10 Langkah Kerja Wajib Setiap Anggota

```bash
# 1. Clone repository (dilakukan sekali di awal)
git clone <url-repository-github>
cd ARTORA
npm install

# 2. Pastikan berada di main dan tarik update terbaru
git checkout main
git pull origin main

# 3. Buat dan pindah ke feature branch masing-masing
# Contoh untuk Risa:
git checkout -b feature/artwork-explorer

# 4. Kembangkan fitur sesuai tugas & DESIGN.md
npm run dev

# 5. Cek status file dan lakukan commit yang bermakna
git status
git add src/pages/ArtworkExplorer.jsx src/components/ArtworkCard.jsx
git commit -m "feat: implement museum-style ArtworkCard and gallery grid"

# 6. Pastikan lint dan build lolos sebelum push
npm run lint
npm run build

# 7. Push feature branch ke GitHub
git push -u origin feature/artwork-explorer

# 8. Buka Pull Request di GitHub dengan target branch: main
# 9. Minta review dari Maintainer (dan 1 rekan tim lain) lalu selesaikan seluruh revisi
# 10. Merge PR ke main HANYA setelah mendapat persetujuan (Approved)
```

### Konvensi Pesan Commit

Gunakan format **Conventional Commits** yang singkat, jelas, dan berbasis bahasa Inggris atau Indonesia yang konsisten:

| Prefix | Kegunaan | Contoh |
| :--- | :--- | :--- |
| `feat:` | Menambahkan fitur atau komponen baru | `feat: add department and category filter panel` |
| `fix:` | Memperbaiki bug atau error API/UI | `fix: handle null image_id fallback on ArtworkDetail` |
| `style:` | Penyesuaian visual, spasi, tipografi, warna | `style: align ArtistCard spacing with DESIGN.md` |
| `refactor:` | Merapikan struktur kode tanpa mengubah perilaku | `refactor: extract metadata table into subcomponent` |
| `docs:` | Pembaruan dokumentasi (`README.md`, dll.) | `docs: update environment setup instructions` |
| `chore:` | Konfigurasi proyek, dependency, maintenance | `chore: update gitignore for local build files` |

> **Hindari** pesan commit yang tidak informatif seperti `update`, `fix`, `final`, atau `asdf`.

---

## 6. Panduan Pull Request (PR)

### Template Wajib Deskripsi Pull Request

Setiap kali membuka PR ke `main`, pengaju PR wajib mengisi informasi berikut:

```markdown
## Deskripsi Fitur
Jelaskan secara singkat halaman/fitur apa yang dibangun dan tujuannya.

## Daftar Fungsionalitas yang Diimplementasikan
- [ ] Fitur/komponen 1
- [ ] Fitur/komponen 2

## Screenshot / Rekaman Layar
(Lampirkan screenshot tampilan Desktop dan Mobile, serta state Loading/Empty jika ada)

## File yang Diubah / Ditambahkan
- `src/pages/...`
- `src/components/...`

## Detail Integrasi API
- Endpoint yang digunakan (mis. `GET /artworks/search`)
- Penanganan `null`/data kosong dan error

## Pengujian yang Dilakukan
- [ ] `npm run lint` lolos tanpa error
- [ ] `npm run build` berhasil
- [ ] Diuji di tampilan Desktop (`>=1024px`) dan Mobile (`<768px`)

## Known Issues / Catatan Tambahan
Tuliskan kendala yang masih ada (atau tulis "Tidak ada").
```

### Checklist Review Maintainer

Maintainer (Alvis) mengevaluasi setiap PR menggunakan 8 poin wajib berikut sebelum menekan **Approve & Merge**:

- [ ] **Fungsionalitas:** Apakah fitur berjalan sesuai spesifikasi tanpa error?
- [ ] **Kesesuaian `DESIGN.md`:** Apakah palet warna (`#F5F0E7`, `#451D1D`, `#211D19`, `#B79A6A`, `#FAF8F3`), tipografi, dan spasi sesuai?
- [ ] **Modularitas Kode:** Apakah komponen terstruktur rapi, mudah dibaca, dan tidak menduplikasi komponen lain?
- [ ] **Integrasi API:** Apakah request melalui `src/services/` dan data tidak dibuat-buat (*no mock/fabricated data*)?
- [ ] **State Asinkron:** Apakah state *Loading*, *Error*, dan *Empty* sudah ditangani dengan baik?
- [ ] **Responsivitas:** Apakah tata letak rapi di Desktop, Tablet, dan Mobile tanpa *horizontal overflow*?
- [ ] **Bebas Konflik:** Apakah perubahan tidak menimpa atau merusak fitur anggota lain?
- [ ] **Kebersihan Console:** Apakah tidak ada error atau warning fatal di Browser Console?

---

## 7. Strategi Integrasi & Penanganan Konflik

### Urutan Integrasi yang Direkomendasikan

1. **Fondasi `main` selesai** (Vite, Tailwind, Router, Axios, `DESIGN.md`, `README.md`, `TEAM_WORKFLOW.md`).
2. **Pengembangan `feature/home-experience`** (Alvis — menyediakan `MainLayout`, `Navbar`, `Footer`, dan `Home.jsx`).
3. **Pengembangan `feature/artwork-explorer`** (Risa — menyediakan `ArtworkExplorer.jsx` dan `ArtworkCard.jsx`).
4. **Pengembangan `feature/artist-explorer`** (Imelda — menyediakan `ArtistExplorer.jsx` dan `ArtistCard.jsx`).
5. **Pengembangan `feature/artwork-detail`** (Nisfa — menyediakan `ArtworkDetail.jsx` dan `ArtworkLabel.jsx`).
6. **Review Pull Request secara independen** (prioritaskan merge `feature/home-experience` terlebih dahulu agar seluruh branch dapat menggunakan `MainLayout`, disusul `artwork-explorer`, `artist-explorer`, dan `artwork-detail`).
7. **Merge fitur yang telah disetujui ke `main` satu per satu**.
8. **Pengujian Integrasi End-to-End** (navigasi Home → Artworks → Detail, Home → Artists → Detail, pencarian global, filter, dan responsivitas).
9. **Perbaikan bug (Bug Fixing)** pada branch `fix/...` singkat jika ditemukan isu lintas halaman.
10. **Deployment final & perekaman video demonstrasi**.

### Cara Sinkronisasi Branch Fitur dengan `main` Terbaru

Setiap kali ada PR yang baru di-merge ke `main`, anggota lain wajib memperbarui branch lokalnya agar tidak terjadi konflik besar di akhir:

```bash
# Pastikan semua perubahan di branch sendiri sudah di-commit terlebih dahulu
git fetch origin
git merge origin/main
```

### Cara Menyelesaikan Merge Conflict Secara Aman

1. Jika `git merge origin/main` menampilkan pesan `CONFLICT`, buka file terkait di editor (VS Code).
2. Diskusikan dengan pemilik file jika konflik terjadi pada file bersama (seperti `src/App.jsx`).
3. Pilih kode yang benar dan hapus seluruh penanda konflik (`<<<<<<<`, `=======`, `>>>>>>>`).
4. Uji kembali aplikasi dengan `npm run lint` dan `npm run build`.
5. Selesaikan merge dengan commit normal:
   ```bash
   git add .
   git commit -m "chore: resolve merge conflict with main"
   git push origin <nama-branch-anda>
   ```

> **LARANGAN KERAS:** **Jangan pernah** menggunakan `git push --force` atau `git push -f` pada branch `main` maupun branch yang sedang direview bersama, karena dapat menghapus riwayat commit rekan tim.

---

## 8. Linimasa Proyek 2 Minggu (14 Hari)

| Hari | Fase | Alvis (Maintainer & Home) | Risa (Artwork Explorer) | Imelda (Artist Explorer) | Nisfa (Artwork Detail) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hari 1** | Persiapan Fondasi | Finalisasi repo `main`, `.env.example`, `DESIGN.md`, `TEAM_WORKFLOW.md` | Clone repo, `npm install`, baca `DESIGN.md` & `artworkService.js` | Clone repo, `npm install`, pelajari endpoint `/agents` di `artistService.js` | Clone repo, `npm install`, uji endpoint `/artworks/{id}` & `imageHelper.js` |
| **Hari 2** | Setup Branch & Layout | Buat `feature/home-experience`; bangun `MainLayout`, `Navbar`, `Footer` | Buat `feature/artwork-explorer`; rancang kerangka halaman & `ArtworkCard` | Buat `feature/artist-explorer`; rancang kerangka halaman & `ArtistCard` | Buat `feature/artwork-detail`; rancang struktur 2 kolom & `ArtworkStage` |
| **Hari 3–4** | Integrasi API Inti | Bangun Hero Museum Entrance & integrasi API *Curated Highlights* | Integrasikan `fetchArtworks` & `searchArtworks` ke grid galeri | Integrasikan `searchArtists` (`is_artist=true`) ke direktori seniman | Integrasikan `fetchArtworkById` & tampilkan gambar IIIF `843px` |
| **Hari 5–6** | Fitur Lanjutan | Tambahkan *Exhibition Spotlight*, pintasan koleksi, & navigasi mobile | Bangun `SearchBar`, `FilterPanel` (Department/Category), & `Pagination` | Bangun panel biografi lengkap & integrasi `fetchArtworksByArtist` | Bangun `ArtworkLabel`, tabel metadata lengkap, & `fetchRelatedArtworks` |
| **Hari 7** | State & Polish UI | Rapikan tipografi, warna, aksesibilitas, dan buka **PR #1** (`home-experience`) | Implementasi skeleton loading, error, empty state, & responsivitas | Implementasi loading, error, empty state, sanitasi HTML, & responsivitas | Implementasi detail skeleton, 404/error state, fallback `image_id` kosong |
| **Hari 8** | Review & Merge Tahap 1 | Merge `home-experience` ke `main`; review **PR #2** (`artwork-explorer`) | Buka **PR #2**, sinkronisasi dengan `main`, perbaiki masukan review | Sinkronisasi branch dengan `main` terbaru & lakukan self-testing | Sinkronisasi branch dengan `main` terbaru & lakukan self-testing |
| **Hari 9** | Review & Merge Tahap 2 | Merge `artwork-explorer`; review **PR #3** (`artist-explorer`) & **PR #4** (`artwork-detail`) | Bantu uji silang tautan dari `ArtworkCard` ke `ArtworkDetail` | Buka **PR #3**, perbaiki masukan review | Buka **PR #4**, perbaiki masukan review |
| **Hari 10** | Integrasi Penuh | Merge `artist-explorer` & `artwork-detail`; sambungkan seluruh rute di `App.jsx` | Verifikasi integrasi Search global Navbar → `/artworks?q=...` | Verifikasi reuse `ArtworkCard` & tautan karya seniman → `/artworks/:id` | Verifikasi tautan *Related Artworks* & tombol *Back to Exhibition* |
| **Hari 11** | Pengujian Integrasi | Uji *end-to-end* seluruh halaman (Desktop, Tablet, Mobile) & audit `DESIGN.md` | Uji filter kombinasi, paginasi, & edge-case query kosong | Uji pencarian seniman tanpa biografi / tanpa karya | Uji karya tanpa gambar, deskripsi panjang, & ID tidak valid |
| **Hari 12** | Bug Fixing | Perbaiki bug integrasi/layout & pastikan `npm run lint` + `npm run build` bersih | Perbaiki bug yang ditemukan saat pengujian integrasi | Perbaiki bug yang ditemukan saat pengujian integrasi | Perbaiki bug yang ditemukan saat pengujian integrasi |
| **Hari 13** | Dokumentasi & Deploy | Perbarui `README.md` final & deploy versi produksi (Vercel/Netlify) | Siapkan materi demo & screenshot bagian Artwork Explorer | Siapkan materi demo & screenshot bagian Artist Explorer | Siapkan materi demo & screenshot bagian Artwork Detail |
| **Hari 14** | Video Demo & Penyerahan | Rekaman demo Homepage & arsitektur + kompilasi video final & pengumpulan | Rekaman demo fitur Artwork Explorer | Rekaman demo fitur Artist Explorer | Rekaman demo fitur Artwork Detail |

---

## 9. Kriteria Penyelesaian (Definition of Done)

### Kriteria Individu (Wajib Dipenuhi oleh Setiap Anggota)

Setiap anggota (**Alvis, Risa, Imelda, dan Nisfa**) dinyatakan **Selesai (Done)** apabila memiliki:

- [ ] Minimal **1 halaman/fitur lengkap** yang berfungsi penuh sesuai pembagian tugas.
- [ ] **Feature branch tersendiri** di GitHub sesuai penamaan resmi.
- [ ] Riwayat **Git commit yang bermakna** dan mengikuti konvensi (`feat:`, `fix:`, `style:`, dll.).
- [ ] Minimal **1 Pull Request** yang telah direview dan di-merge ke `main`.
- [ ] **Integrasi API nyata** dari Art Institute of Chicago (bukan data statis/palsu).
- [ ] **UI responsif** (Desktop, Tablet, Mobile) yang mematuhi [`DESIGN.md`](./DESIGN.md).
- [ ] **Penanganan state asinkron** (Loading, Error, Empty, serta data `null`).
- [ ] **Bukti kontribusi terdokumentasi** (deskripsi PR, screenshot/rekaman demo, dan commit history).

### Kriteria Tim (Siap Pengumpulan)

- [ ] Seluruh 4 fitur terintegrasi mulus di branch `main`.
- [ ] `npm run lint` dan `npm run build` berjalan dengan **0 error**.
- [ ] Tidak ada *broken link*, *console error*, atau gambar yang terpotong/distorsi di tampilan detail.
- [ ] Aplikasi dapat di-clone, di-install (`npm install`), dan dijalankan (`npm run dev`) oleh dosen maupun anggota tim lain tanpa konfigurasi tersembunyi.

---

## 10. Aturan Komunikasi Tim

1. **Laporan Progres Berkala:** Setiap anggota mengirim update singkat setiap 2 hari di grup tim dengan format: *Sudah dikerjakan / Sedang dikerjakan / Kendala (Blocker)*.
2. **Permintaan Perubahan Komponen Bersama:** Jika membutuhkan prop baru atau penyesuaian pada `Navbar`, `Footer`, `MainLayout`, `ArtworkCard`, atau `src/index.css`, ajukan di grup tim dengan menyebut pemilik file dan Maintainer sebelum mengubahnya.
3. **Pelaporan Kendala API:** Jika menemui limit rate (`429`), perubahan struktur field, atau error endpoint AIC API, segera bagikan URL request dan pesan errornya di grup agar seluruh tim mengetahui solusinya.
4. **Koordinasi File Bersama:** Perubahan pada `src/App.jsx`, `package.json`, dan `src/services/*` wajib dikonfirmasi terlebih dahulu kepada **Alvis (Maintainer)**.
5. **SLA Review Pull Request:** Setelah PR dibuka dan diumumkan di grup, Maintainer memberikan review maksimal dalam **24 jam** agar tidak menghambat jadwal integrasi.
6. **Penanganan Blocker:** Jika seorang anggota mengalami kendala teknis lebih dari **1 hari**, wajib segera melapor di grup tim untuk sesi *pair debugging* bersama Maintainer atau rekan tim lain.
7. **Pencegahan Pekerjaan Ganda:** Sebelum membuat komponen utilitas baru (mis. modal, spinner, atau formatter tanggal), cek terlebih dahulu `src/components/`, `src/utils/`, dan tabel kepemilikan file di Bagian 4.
