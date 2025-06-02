<p align="center">
  <img src="./public/screenshot/all-devices.png" alt="Aperçu multi-devices Dish Duty" style="max-width:100%; border-radius: 16px;" />
</p>

<h1 align="center">🍽️ Dish Duty</h1>
<p align="center">
  <img src="./public/dish-duty-logo.png" alt="Dish Duty Logo" width="120" />
</p>
<p align="center">
  <b>L'application familiale ultime pour ne plus jamais se disputer la vaisselle !</b><br>
  <a href="https://ton-site-dish-duty.com" target="_blank">Voir le site en ligne 🚀</a>
</p>

---

## ✨ Présentation

**Dish Duty** est une application web moderne, responsive et ultra fluide, pensée pour organiser la corvée de vaisselle dans la bonne humeur.  
Notifications push, planning intelligent, design mobile & desktop, tout y est pour une expérience utilisateur au top !

---

## 🖥️ Aperçu multi-supports

<p align="center">
  <img src="./public/screenshot/all-devices.png" alt="Aperçu multi-devices" style="max-width:100%; border-radius: 16px;" />
</p>

---

## 📱 Vue quotidienne

<p align="center">
  <img src="./public/screenshot/daily-view.png" alt="Vue quotidienne" width="350" style="border-radius: 12px; box-shadow: 0 4px 24px #0001;" />
</p>

- Affichage du responsable du jour
- Message motivant aléatoire
- Design coloré et dynamique

---

## 📅 Vue hebdomadaire

<p align="center">
  <img src="./public/screenshot/weekly-view.png" alt="Vue hebdomadaire" width="350" style="border-radius: 12px; box-shadow: 0 4px 24px #0001;" />
</p>

- Planning de la semaine
- Attribution claire pour chaque jour
- Légende colorée pour chaque membre

---

## 🚀 Fonctionnalités principales

- **Notifications push** (Web Push API)
- **Responsive** : mobile, tablette, desktop
- **Planning automatique** (rotation personnalisable)
- **Design moderne** (animations, skeletons de chargement)
- **Mode admin** pour gérer les abonnements
- **Expérience utilisateur premium** (transitions, feedbacks, accessibilité)

---

## 🛠️ Stack technique

- **Next.js 15**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **MongoDB** (stockage des abonnements)
- **Web Push** (notifications)
- **React Hot Toast** (feedback utilisateur)
- **Radix UI** (composants accessibles)

---

## 📸 Galerie de screenshots

<p align="center">
  <img src="./public/screenshot/desktop.png" alt="Vue desktop" width="400" style="border-radius: 12px; margin: 8px;" />
  <img src="./public/screenshot/laptop.png" alt="Vue laptop" width="400" style="border-radius: 12px; margin: 8px;" />
  <img src="./public/screenshot/tablet.png" alt="Vue tablette" width="300" style="border-radius: 12px; margin: 8px;" />
</p>

---

## 🔔 Notifications Push

- Système d'abonnement simple (1 clic)
- Notifications automatiques pour rappeler la corvée
- Gestion des abonnements en base MongoDB

---

## 🧑‍💻 Installation & développement

```bash
git clone https://github.com/ton-utilisateur/dish-duty-app.git
cd dish-duty-app

# Installe les dépendances
npm install

# Copie le .env.example et configure tes clés
cp .env.example .env.local

# Lance le serveur de dev
npm run dev
```

---

## ⚙️ Configuration

**Variables d'environnement principales :**

- `MONGO_URI` : URL de connexion MongoDB
- `NEXT_PUBLIC_VAPID_PUBLIC_KEY` : Clé publique VAPID (Web Push)
- `VAPID_PRIVATE_KEY` : Clé privée VAPID
- `ADMIN_PASSWORD` : Mot de passe admin pour la gestion des abonnements

---

## 🏗️ Structure du projet

```
/app
  /components
    MobileLayout.tsx
    DesktopLayout.tsx
    daily-view.tsx
    weekly-view.tsx
    ui/
  /api
  /lib
  /public
    /screenshot
      all-devices.png
      daily-view.png
      weekly-view.png
      ...
    dish-duty-logo.png
```

---

## 👨‍👩‍👧‍👦 Pour qui ?

- Familles, colocations, couples, amis…
- Toute personne qui veut une répartition équitable et fun des tâches !

---

## 💡 Personnalisation

- Modifie le planning dans `lib/utils.ts` pour adapter les prénoms et la rotation.
- Change les phrases motivantes dans `components/daily-view.tsx`.
- Ajoute tes propres couleurs ou avatars dans le code.

---

## 🛡️ Sécurité & RGPD

- Les abonnements push sont anonymes et stockés en base.
- Pas de tracking, pas de pub, juste la vaisselle !

---

## 📬 Contact & support

- [Ouvre une issue sur GitHub](https://github.com/ton-utilisateur/dish-duty-app/issues)
- Contacte-moi sur [ton-email@exemple.com](mailto:ton-email@exemple.com)

---

<p align="center">
  <img src="./public/dish-duty-logo.png" alt="Dish Duty Logo" width="80" />
  <br>
  <b>Dish Duty</b> — La vaisselle, sans prise de tête !
</p> 