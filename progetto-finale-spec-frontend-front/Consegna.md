🖼️ Cosa devi realizzare

Una SPA che simula l’esperienza di un utente non autenticato, che può:

Sfogliare, cercare e filtrare record
Confrontare più elementi tra loro
Salvare i preferiti
❌ Non può creare, modificare o cancellare record.

🔍 Tecnologie da utilizzare

Il progetto deve essere sviluppato esclusivamente con React in JavaScript, utilizzando solo le tecnologie viste durante il corso.

È consentito però l’uso di librerie esterne per la gestione dello styling, come ad esempio Tailwind CSS, Bootstrap o styled-components, purché non alterino il comportamento logico dell’applicazione.

👉 Il backend è già pronto: il tuo compito è sviluppare tutta la parte frontend.

⚠️ Mi raccomando: leggi tutto con attenzione fino in fondo e non tralasciare nulla! Ogni parte contiene informazioni importanti per completare il progetto al meglio (e consegnarlo correttamente).

🎨 Tematica a Scelta

Scegli liberamente l’argomento del tuo comparatore.

✅ Qualsiasi entità con proprietà confrontabili è valida!

Ecco qualche esempio di ispirazione:

📱 Dispositivi (smartphone, tablet, smartwatch…)
🎧 Multimedia (televisori, cuffie, fotocamere…)
💻 Informatica (laptop, GPU, monitor…)
🎮 Software (videogiochi, OS, streaming…)
✈️ Viaggi (città, destinazioni…)
🚲 Trasporti (auto, bici, monopattini…)
🧠 Educazione (università, corsi…)
🍎 Alimenti (tipi di frutta, vini, caffè…)
🏠 Casa (elettrodomestici, giochi da tavolo, mobili…)

🛠️ Backend Pronto All’Uso

Clona questo repo:

https://github.com/boolean-it/progetto-finale-spec-frontend-back

All’interno troverai un file chiamato types.ts.

🔧 Definisci le tue risorse

Nel file types.ts, definisci una o più risorse (es. Product, Game, Course...), purché:

✅ Siano esportate (export)
✅ Contengano sempre almeno queste 2 proprietà obbligatorie:
export type Product = {
title: string;
category: string;
};
💡 Ad eccezione di id, createdAt e updatedAt (che vengono aggiunte in automatico dal server), puoi aggiungere tutte le proprietà opzionali che vuoi, purché coerenti con la risorsa scelta (es. price, brand, releaseYear...).

Le proprietà readonly che inserisci possono venire salvate solo in creazione, ma non in update.

Il backend userà automaticamente il nome del tipo per generare:

File product.json nella cartella /database
Endpoint REST: /products, /products/:id, ecc.

🔧 API disponibili

Ecco le API REST disponibili per ogni tipo di risorsa:

POST /{tipo}s ➡️ Crea un nuovo record. Vengono ignorate le proprietà id, createdAt, updatedAt, se passate (vengono gestite autonomamente dal server). Restituisce il record completo.

GET /{tipo}s/:id ➡️ Restituisce un record per id. Restituisce errore se non trovato.

PUT /{tipo}s/:id ➡️ Aggiorna un record per id. Vengono ignorate le proprietà id, createdAt, updatedAt, se passate Restituisce errore se non trovato.

DELETE /{tipo}s/:id ➡️ Elimina il record per id. Restituisce errore se non trovato.

GET /{tipo}s ➡️ Restituisce la lista dei record Solo proprietà: id, createdAt, updatedAt, title, category Supporta query string:

?search=... → cerca in title
?category=... → filtra per category
Esempio: /products?search=iphone&category=tech

🔧 Dove vengono salvati i dati?

Ogni risorsa viene salvata come file .json in /database.

Esempio: se definisci Product, il backend creerà product.json.

Puoi inserire i dati:

Tramite API (fetch, Postman…)
Manualmente nei file .json (rispettando la forma del tipo)

📌 Popola ogni risorsa con almeno 10 record validi, per avere materiale sufficiente da confrontare.

⚠️ Attenzione!

❌ Non modificare:

I file .ts, .js o .json che definiscono la logica del server

Le rotte API (sono generate automaticamente in base a types.ts)

Le modalità di risposta o comportamento degli endpoint

✅ Puoi modificare SOLO:

Il file types.ts, per definire la tua risorsa

I file .json all'interno della cartella /database, per popolare i dati (manualmente o tramite API)

🥉 Requisiti Minimi

Per considerare il progetto completo, devono essere implementate almeno queste funzionalità:

Gestione di una risorsa definita in types.ts

Lista dei record, che mostra solo le proprietà principali title e category, e include:

Barra di ricerca per cercare nei titoli (title)
Filtro per categoria (category)
Ordinamento alfabetico per title o category (A-Z e Z-A)
Pagina di dettaglio per ogni record, con visualizzazione estesa delle sue proprietà (es. price, description, brand, ecc.)

Comparatore di 2 record, visualizzati affiancati per confrontarne le caratteristiche.

È libera la modalità di selezione: puoi permettere all’utente di aggiungere record al comparatore direttamente dalla lista, dalla pagina di dettaglio, oppure usare un menu a tendina, checkbox o qualsiasi altro sistema.

L’importante è che l’utente possa scegliere 2 record qualsiasi e confrontarli in modo chiaro.

Sistema di preferiti, sempre accessibile e aggiornabile:

L’utente può aggiungere o rimuovere record dai preferiti in qualsiasi momento
I preferiti devono essere consultabili in ogni sezione dell’app (es. tramite una sezione dedicata, un’icona fissa, o una sidebar)

🥈 Requisiti Consigliati (Facoltativi)

Da affrontare solo dopo aver completato i Requisiti Minimi:

Comparatore di 2 o più record: il layout si adatta per confrontare più elementi affiancati
Debounce sulla ricerca, per migliorare la UX ed evitare chiamate API inutili
Persistenza dei preferiti (es. salvataggio in localStorage), così che rimangano anche dopo il refresh della pagina
Gestione degli stati vuoti, come:
Nessun risultato trovato
Lista preferiti vuota
Nessun elemento selezionato nel comparatore

🥇 Requisiti Aggiuntivi (Facoltativi)

Da affrontare solo dopo i Requisiti Consigliati:

Gestione di più risorse nella stessa SPA (es. products e courses), con interfacce distinte o integrate
CRUD completo dal frontend:
Creazione di nuovi record
Modifica di record esistenti
Eliminazione di record
Validazione dei campi in input

🎯 BONUS (Facoltativo)

Da affrontare solo dopo i Requisiti Aggiuntivi:

Creazione di una seconda versione del progetto in TypeScript.Se hai completato tutti i requisiti minimi, consigliati e aggiuntivi, puoi realizzare una nuova versione parallela del progetto usando TypeScript.
⚠️La versione principale deve comunque rimanere in JavaScript, come richiesto dal progetto.

⏱️ Come affrontare il progetto

Il progetto finale è pensato per essere svolto in 7 giorni di lavoro.

❗ Non è consigliato lavorarci per più o meno tempo.

📌 Obiettivo principale

Completare tutti i Requisiti Minimi. Sono fondamentali!

❌ Anche uno solo mancante comporterà una penalizzazione all’esame, indipendentemente da quanti requisiti facoltativi siano presenti.

📌 Requisiti facoltativi?

I Requisiti Consigliati, Aggiuntivi e Bonus sono opzionali:

sono lì solo per arricchire il progetto se riesci a finire i Requisiti Minimi in meno di 7 giorni.

⛔ Non è necessario (né consigliato) lavorare 10 o 15 giorni per completare anche i requisiti facoltativi.

✅ È invece importante saper valutare quanto spingersi oltre, mantenendo tempi realistici e un progetto solido.

📌 Consegna del progetto

Al momento del push finale del tuo progetto, ricordati di includere anche:

La cartella /database del backend, contenente i file .json generati per la tua risorsa
Il file types.ts, con la definizione della risorsa (o delle risorse) utilizzate

Perché è importante?

Questi due elementi servono a:

Far capire all’insegnante la struttura dei dati su cui hai lavorato
Consentire di fare dei test funzionali sull’app, con dati reali già pronti
📌 Assicurati che i file .json contengano almeno 10 record coerenti con la tipologia scelta.

❗ Progetti senza database e types.ts potrebbero risultare incompleti e difficili da valutare correttamente.

💪 Buon lavoro!
