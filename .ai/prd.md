# Dokument wymagań produktu (PRD) - EduFiszki AI

## 1. Przegląd produktu
EduFiszki AI to aplikacja internetowa (webowa) zaprojektowana w celu ułatwienia procesu tworzenia i nauki przy użyciu fiszek edukacyjnych. Głównym celem produktu jest rozwiązanie problemu czasochłonności manualnego przygotowywania fiszek poprzez wykorzystanie sztucznej inteligencji (AI) do ich generowania na podstawie dostarczonego przez użytkownika tekstu. Aplikacja pozwoli również na manualne tworzenie fiszek, ich organizację w foldery oraz naukę z wykorzystaniem zintegrowanego algorytmu powtórek opartego na zasadzie spaced repetition. Produkt w wersji MVP (Minimum Viable Product) skupi się na podstawowych funkcjonalnościach umożliwiających efektywne tworzenie i przechowywanie fiszek oraz prosty system nauki.

## 2. Problem użytkownika
Manualne tworzenie wysokiej jakości fiszek edukacyjnych jest procesem czasochłonnym i często zniechęcającym. Użytkownicy, szczególnie ci początkujący w metodzie fiszek, mogą mieć trudności z optymalnym dzieleniem informacji i formułowaniem treści fiszek tak, aby były one efektywne w nauce. Ten wysiłek i niepewność co do "poprawności" tworzonych materiałów stanowią barierę w korzystaniu z metody spaced repetition, która jest uznawana za wysoce skuteczną technikę nauki. EduFiszki AI ma na celu zredukowanie tego wysiłku i niepewności, oferując szybkie generowanie fiszek przez AI oraz narzędzia do ich łatwego zarządzania.

## 3. Wymagania funkcjonalne
### 3.1. Zarządzanie kontem użytkownika
3.1.1. Rejestracja użytkownika za pomocą adresu email i hasła.
3.1.2. Logowanie użytkownika za pomocą adresu email i hasła.
3.1.3. Bezpieczne przechowywanie danych uwierzytelniających użytkownika.

### 3.2. Generowanie fiszek przez AI
3.2.1. Umożliwienie użytkownikowi wprowadzenia tekstu (kopiuj-wklej) jako podstawy do generowania fiszek. Pole tekstowe oczekuje od 1000 do 10 000 znaków.
3.2.3. Umożliwienie użytkownikowi określenia pożądanej liczby fiszek do wygenerowania.
3.2.4. Po kliknięciu generowania aplikacja komunikuje się z API modelu LLM i wyświetla listę wygenerowanych propozycji fiszek do akceptacji.
3.2.5. W przypadku problemów z API lub braku odpowiedzi modelu użytkownik zobaczy stosowny komunikat błędu.
3.2.4. Generowanie przez AI "kandydatów na fiszki" składających się z pola "przód" (do 200 znaków) i "tył" (do 500 znaków). 
3.2.5. Wygenerowane fiszki mogą zawierać formatowanie: nowa linia, pogrubienie.
3.2.6. Prezentacja wygenerowanych "kandydatów na fiszki" użytkownikowi w interfejsie recenzji.
3.2.7. Umożliwienie użytkownikowi akceptacji, edycji lub odrzucenia każdego "kandydata na fiszkę".
3.2.8. Zapisywanie zaakceptowanych (lub zaakceptowanych po edycji) fiszek w kolekcji użytkownika (w wybranym folderze).
3.2.9. Trwałe usuwanie odrzuconych "kandydatów na fiszki".
3.2.10. Walidacja po stronie front-endu długości pól fiszki podczas edycji przez użytkownika. AI powinno dążyć do generowania fiszek w ramach limitów.

### 3.3. Manualne tworzenie fiszek
3.3.1. Umożliwienie użytkownikowi manualnego tworzenia fiszek z polami "przód" (do 200 znaków) i "tył" (do 500 znaków).
3.3.2. Możliwość stosowania formatowania: nowa linia, pogrubienie.
3.3.3. Zapisywanie manualnie stworzonych fiszek w kolekcji użytkownika (w wybranym folderze).

### 3.4. Zarządzanie fiszkami i folderami
3.4.1. Wyświetlanie listy fiszek użytkownika z paginacją.
3.4.2. Umożliwienie tworzenia folderów do grupowania fiszek. Foldery wyświetlane jako lista.
3.4.3. Umożliwienie przypisywania fiszek (zarówno generowanych przez AI, jak i manualnych) do folderów.
3.4.4. Prosta wyszukiwarka tekstowa przeszukująca zawartość pól "przód" i "tył" fiszek.
3.4.5. Umożliwienie edycji istniejących fiszek (w oknie modalnym).
3.4.6. Umożliwienie usuwania fiszek z kolekcji (z dodatkowym potwierdzeniem).

### 3.5. System nauki (Spaced Repetition)
3.5.1. Integracja z gotową biblioteką open-source realizującą algorytm powtórek.
3.5.2. Umożliwienie użytkownikowi ręcznego zainicjowania sesji nauki ("gry") dla wybranego folderu fiszek.
3.5.3. Interfejs nauki prezentujący fiszki zgodnie z logiką algorytmu powtórek, będący częścią aplikacji.

### 3.6. Wymagania niefunkcjonalne
3.6.1. Bezpieczeństwo: Stosowanie standardowych praktyk bezpieczeństwa (autentykacja, autoryzacja, RLS, walidacja danych wejściowych).
3.6.2. Użyteczność: Intuicyjny i łatwy w obsłudze interfejs użytkownika.
3.6.3. Wydajność: Akceptowalny czas odpowiedzi systemu, zwłaszcza podczas generowania fiszek przez AI (szczegółowe metryki do zdefiniowania).

## 4. Granice produktu
### 4.1. Funkcjonalności w zakresie MVP
4.1.1. Generowanie fiszek przez AI na podstawie wprowadzonego tekstu (kopiuj-wklej).
4.1.2. Manualne tworzenie fiszek.
4.1.3. Przeglądanie, edycja i usuwanie fiszek.
4.1.4. Prosty system kont użytkowników do przechowywania fiszek.
4.1.5. Integracja fiszek z gotowym algorytmem powtórek (biblioteka open-source).
4.1.6. Organizacja fiszek w foldery.
4.1.7. Wyszukiwanie fiszek.

### 4.2. Funkcjonalności poza zakresem MVP
4.2.1. Własny, zaawansowany algorytm powtórek (np. na wzór SuperMemo, Anki).
4.2.2. Import fiszek lub materiałów z wielu formatów (PDF, DOCX, itp.).
4.2.3. Współdzielenie zestawów fiszek (folderów) między użytkownikami.
4.2.4. Integracje z innymi platformami edukacyjnymi.
4.2.5. Aplikacje mobilne (natywne).
4.2.6. Zaawansowane filtrowanie fiszek (np. po dacie utworzenia, statusie nauki).
4.2.7. Zaawansowane formatowanie tekstu w fiszkach (np. obrazy, kolory, listy punktowane).
4.2.8. Logowanie przez dostawców zewnętrznych (np. Google, Facebook).
4.2.9. Specjalne wskazówki dla użytkownika dotyczące optymalizacji tekstu dla AI.
4.2.10. Możliwość przenoszenia fiszek między folderami (choć jest to częsta funkcja, nie została jawnie potwierdzona w MVP, więc na razie poza zakresem, ale do rozważenia).

## 5. Historyjki użytkowników

### 5.1. Zarządzanie Kontem Użytkownika
ID: US-AUTH-001
Tytuł: Rejestracja nowego użytkownika
Opis: Jako nowy użytkownik, chcę móc zarejestrować konto w systemie używając adresu email i hasła, aby móc tworzyć i przechowywać swoje fiszki.
Kryteria akceptacji:
1.  Użytkownik może uzyskać dostęp do formularza rejestracyjnego.
2.  Formularz rejestracyjny wymaga podania adresu email, hasła oraz potwierdzenia hasła.
3.  System waliduje poprawność formatu adresu email.
4.  System sprawdza, czy podane hasło i jego potwierdzenie są identyczne.
5.  System informuje o minimalnych wymaganiach co do siły hasła (np. długość).
6.  Po pomyślnym przesłaniu formularza, konto użytkownika jest tworzone w systemie.
7.  Użytkownik jest informowany o pomyślnym zakończeniu rejestracji.
8.  Użytkownik nie może zarejestrować się używając adresu email, który już istnieje w systemie.
9.  W przypadku błędów walidacji (np. niepoprawny email, różne hasła), użytkownik otrzymuje czytelne komunikaty błędów przy odpowiednich polach.

ID: US-AUTH-002
Tytuł: Logowanie istniejącego użytkownika
Opis: Jako zarejestrowany użytkownik, chcę móc zalogować się do systemu używając mojego adresu email i hasła, aby uzyskać dostęp do moich fiszek.
Kryteria akceptacji:
1.  Użytkownik może uzyskać dostęp do formularza logowania.
2.  Formularz logowania wymaga podania adresu email i hasła.
3.  Po pomyślnym uwierzytelnieniu, użytkownik jest przekierowywany do panelu głównego aplikacji.
4.  W przypadku podania niepoprawnego adresu email lub hasła, użytkownik otrzymuje stosowny komunikat błędu.
5.  System powinien chronić przed atakami typu brute-force (np. poprzez limit prób logowania).

ID: US-AUTH-003
Tytuł: Wylogowanie użytkownika
Opis: Jako zalogowany użytkownik, chcę móc wylogować się z systemu, aby zakończyć sesję.
Kryteria akceptacji:
1.  W interfejsie użytkownika dostępna jest opcja wylogowania.
2.  Po wybraniu opcji wylogowania, sesja użytkownika jest kończona.
3.  Użytkownik jest przekierowywany na stronę publiczną (np. logowania lub główną).

### 5.2. Generowanie Fiszki przez AI
ID: US-AI-001
Tytuł: Inicjowanie generowania fiszek przez AI
Opis: Jako zalogowany użytkownik, chcę móc wprowadzić tekst, wybrać liczbę fiszek oraz podać kategorię tematyczną, aby AI wygenerowało dla mnie propozycje fiszek.
Kryteria akceptacji:
1.  Użytkownik ma dostęp do formularza generowania fiszek AI.
2.  Formularz pozwala na wklejenie lub wpisanie tekstu źródłowego.
3.  Formularz pozwala na wprowadzenie liczby fiszek do wygenerowania (np. pole numeryczne).
4.  Formularz pozwala na wprowadzenie tekstowej "kategorii" dla fiszek.
5.  Przycisk "Generuj" jest aktywny, gdy wszystkie wymagane pola są wypełnione.
6.  System przekazuje wprowadzone dane (tekst, liczba, kategoria) do modułu AI.

ID: US-AI-002
Tytuł: Recenzja i akceptacja fiszek wygenerowanych przez AI
Opis: Jako zalogowany użytkownik, po zleceniu generowania fiszek AI, chcę móc przejrzeć wygenerowane "kandydatury na fiszki", edytować je, zaakceptować lub odrzucić.
Kryteria akceptacji:
1.  Po zakończeniu generowania przez AI, użytkownik widzi listę "kandydatów na fiszki".
2.  Każdy kandydat wyświetla pole "przód" i "tył".
3.  Użytkownik może edytować zawartość pól "przód" i "tył" każdego kandydata (zgodnie z limitami znaków i formatowaniem).
4.  Użytkownik ma opcję "Akceptuj" dla każdego kandydata (lub po edycji).
5.  Użytkownik ma opcję "Odrzuć" dla każdego kandydata.
6.  Zaakceptowani kandydaci (po ewentualnej edycji) są przygotowywani do zapisu.
7.  Odrzuceni kandydaci są usuwani i nie są zapisywani (bez dodatkowego potwierdzenia).
8.  Użytkownik może wybrać folder, do którego zostaną zapisane zaakceptowane fiszki.
9.  Po zakończeniu recenzji i wyborze folderu, zaakceptowane fiszki są zapisywane w bazie danych.

ID: US-AI-003
Tytuł: Obsługa limitów znaków dla fiszek generowanych przez AI
Opis: Jako użytkownik, oczekuję, że fiszki generowane przez AI będą zgodne z limitami znaków (przód do 200, tył do 500), a podczas edycji kandydatów będę informowany o przekroczeniu limitów.
Kryteria akceptacji:
1.  AI dąży do generowania fiszek, których pola "przód" i "tył" nie przekraczają zdefiniowanych limitów znaków.
2.  Podczas edycji "kandydata na fiszkę", interfejs użytkownika na bieżąco informuje o liczbie znaków i ostrzega przy przekroczeniu limitu.
3.  Zapis fiszki z przekroczonym limitem znaków (po edycji użytkownika) jest blokowany lub użytkownik jest o tym wyraźnie informowany.

ID: US-AI-004
Tytuł: Obsługa pustego lub nieadekwatnego tekstu dla AI
Opis: Jako użytkownik, jeśli wprowadzę pusty tekst lub tekst, z którego AI nie jest w stanie wygenerować fiszek, chcę otrzymać stosowny komunikat.
Kryteria akceptacji:
1.  System waliduje, czy wprowadzony tekst do generowania fiszek nie jest pusty.
2.  Jeśli tekst jest pusty, użytkownik otrzymuje komunikat błędu.
3.  Jeśli AI nie jest w stanie wygenerować sensownych fiszek (np. tekst jest za krótki, nie zawiera treści merytorycznej), użytkownik jest o tym informowany.

### 5.3. Manualne Tworzenie Fiszki
ID: US-MAN-001
Tytuł: Tworzenie nowej fiszki manualnie
Opis: Jako zalogowany użytkownik, chcę móc manualnie stworzyć nową fiszkę, podając treść dla strony przedniej i tylnej oraz zapisać ją w wybranym folderze.
Kryteria akceptacji:
1.  Użytkownik ma dostęp do formularza tworzenia manualnej fiszki.
2.  Formularz zawiera pola tekstowe dla "przodu" (limit 200 znaków) i "tyłu" (limit 500 znaków) fiszki.
3.  Użytkownik może stosować formatowanie: nowa linia, pogrubienie.
4.  Interfejs informuje o limitach znaków i bieżącym ich wykorzystaniu.
5.  Użytkownik może wybrać folder, w którym fiszka ma być zapisana.
6.  Po wypełnieniu pól i wybraniu folderu, użytkownik może zapisać fiszkę.
7.  Fiszka jest zapisywana w bazie danych i powiązana z kontem użytkownika i wybranym folderem.
8.  Zapis fiszki z przekroczonym limitem znaków jest blokowany lub użytkownik jest o tym wyraźnie informowany.

### 5.4. Zarządzanie Fiszkami i Folderami
ID: US-MNG-001
Tytuł: Przeglądanie listy fiszek
Opis: Jako zalogowany użytkownik, chcę móc przeglądać listę moich fiszek, z podziałem na strony, aby łatwo zarządzać swoimi materiałami.
Kryteria akceptacji:
1.  Domyślnie (lub po wyborze) użytkownik widzi listę wszystkich swoich fiszek lub fiszek z wybranego folderu.
2.  Lista fiszek wyświetla co najmniej fragment treści "przodu" i "tyłu".
3.  Jeśli liczba fiszek przekracza określoną wartość na stronę, dostępna jest paginacja.
4.  Użytkownik może nawigować między stronami listy fiszek.

ID: US-MNG-002
Tytuł: Wyszukiwanie fiszek
Opis: Jako zalogowany użytkownik, chcę móc wyszukiwać fiszki na podstawie słów kluczowych, aby szybko znaleźć potrzebne materiały.
Kryteria akceptacji:
1.  Na stronie listy fiszek dostępne jest pole wyszukiwania.
2.  Użytkownik może wprowadzić tekst do wyszukania.
3.  System przeszukuje treść pól "przód" i "tył" wszystkich fiszek użytkownika (lub w obrębie wybranego folderu).
4.  Wyniki wyszukiwania są wyświetlane na liście, zastępując pełną listę fiszek.
5.  Jeśli nic nie znaleziono, wyświetlany jest odpowiedni komunikat.

ID: US-MNG-003
Tytuł: Edycja istniejącej fiszki
Opis: Jako zalogowany użytkownik, chcę móc edytować treść istniejącej fiszki, aby poprawić błędy lub zaktualizować informacje.
Kryteria akceptacji:
1.  Na liście fiszek przy każdej fiszce dostępna jest opcja "Edytuj".
2.  Po wybraniu opcji "Edytuj", otwiera się modal (lub dedykowany formularz) z polami "przód" i "tył" wypełnionymi aktualną treścią fiszki.
3.  Użytkownik może modyfikować treść pól, zachowując limity znaków i opcje formatowania.
4.  Interfejs informuje o limitach znaków.
5.  Po dokonaniu zmian użytkownik może zapisać fiszkę.
6.  Zmiany są zapisywane w bazie danych.
7.  Użytkownik może anulować edycję bez zapisywania zmian.

ID: US-MNG-004
Tytuł: Usuwanie istniejącej fiszki
Opis: Jako zalogowany użytkownik, chcę móc usunąć fiszkę, której już nie potrzebuję.
Kryteria akceptacji:
1.  Na liście fiszek przy każdej fiszce dostępna jest opcja "Usuń".
2.  Po wybraniu opcji "Usuń", system prosi użytkownika o potwierdzenie tej akcji (np. w oknie modalnym).
3.  Po potwierdzeniu przez użytkownika, fiszka jest trwale usuwana z bazy danych.
4.  Jeśli użytkownik anuluje operację, fiszka nie jest usuwana.

ID: US-FLD-001
Tytuł: Tworzenie nowego folderu
Opis: Jako zalogowany użytkownik, chcę móc tworzyć nowe foldery, aby organizować moje fiszki tematycznie.
Kryteria akceptacji:
1.  W interfejsie zarządzania fiszkami/folderami dostępna jest opcja "Stwórz nowy folder".
2.  Użytkownik jest proszony o podanie nazwy dla nowego folderu.
3.  Nazwa folderu nie może być pusta i powinna być unikalna dla danego użytkownika.
4.  Po podaniu nazwy i zatwierdzeniu, nowy, pusty folder jest tworzony i powiązany z kontem użytkownika.
5.  Nowy folder pojawia się na liście folderów użytkownika.

ID: US-FLD-002
Tytuł: Wyświetlanie fiszek w folderze
Opis: Jako zalogowany użytkownik, chcę móc wybrać folder i zobaczyć tylko fiszki, które do niego należą.
Kryteria akceptacji:
1.  Użytkownik widzi listę swoich folderów.
2.  Po kliknięciu na nazwę folderu, lista fiszek jest filtrowana, aby pokazać tylko te należące do wybranego folderu.
3.  Funkcje takie jak wyszukiwanie, paginacja, edycja, usuwanie działają w kontekście wybranego folderu.

ID: US-FLD-003
Tytuł: Przypisywanie fiszki do folderu podczas tworzenia
Opis: Jako zalogowany użytkownik, podczas tworzenia fiszki (manualnie lub akceptując kandydatów AI), chcę móc wybrać folder, w którym zostanie ona zapisana.
Kryteria akceptacji:
1.  W formularzu tworzenia manualnej fiszki dostępna jest opcja wyboru folderu z listy istniejących folderów użytkownika.
2.  W interfejsie recenzji kandydatów AI dostępna jest opcja wyboru folderu, do którego zostaną zapisane zaakceptowane fiszki.
3.  Jeśli folder nie zostanie wybrany, fiszka może być zapisana w domyślnym folderze (np. "Bez folderu") lub system może wymusić wybór. (Do decyzji projektowej - na razie zakładamy wymuszenie wyboru lub folder domyślny).

### 5.5. System Nauki (Spaced Repetition)
ID: US-LRN-001
Tytuł: Rozpoczynanie sesji nauki dla folderu
Opis: Jako zalogowany użytkownik, chcę móc wybrać folder z fiszkami i rozpocząć sesję nauki opartą na algorytmie spaced repetition.
Kryteria akceptacji:
1.  Przy każdym folderze na liście folderów (lub w widoku folderu) dostępna jest opcja "Rozpocznij naukę".
2.  Po wybraniu tej opcji, rozpoczyna się sesja nauki z fiszkami z danego folderu.
3.  Fiszki są prezentowane zgodnie z logiką zintegrowanej biblioteki spaced repetition.

ID: US-LRN-002
Tytuł: Interakcja podczas sesji nauki
Opis: Jako zalogowany użytkownik, podczas sesji nauki chcę móc zobaczyć przód fiszki, następnie odkryć jej tył i ocenić swoją znajomość odpowiedzi, aby algorytm mógł zaplanować kolejne powtórki.
Kryteria akceptacji:
1.  Interfejs nauki wyświetla najpierw pole "przód" fiszki.
2.  Dostępna jest opcja "Pokaż odpowiedź" (lub podobna), która odkrywa pole "tył" fiszki.
3.  Po odkryciu odpowiedzi, użytkownik ma możliwość oceny swojej znajomości (np. "Łatwe", "Dobre", "Trudne" - w zależności od możliwości biblioteki SR).
4.  Na podstawie oceny użytkownika, algorytm spaced repetition planuje datę następnej powtórki tej fiszki.
5.  System prezentuje kolejną fiszkę zgodnie z algorytmem.
6.  Sesja nauki trwa do momentu, gdy nie ma więcej fiszek zaplanowanych na dany dzień w tym folderze lub użytkownik zdecyduje się ją przerwać.

ID: US-LRN-003
Tytuł: Zakończenie lub przerwanie sesji nauki
Opis: Jako zalogowany użytkownik, chcę móc zakończyć sesję nauki, gdy nie ma więcej fiszek do powtórzenia, lub przerwać ją w dowolnym momencie.
Kryteria akceptacji:
1.  Gdy wszystkie zaplanowane fiszki w sesji zostaną przerobione, użytkownik jest o tym informowany (np. komunikat "Gratulacje, na dzisiaj to wszystko!").
2.  Użytkownik ma możliwość przerwania sesji nauki w dowolnym momencie (np. przycisk "Zakończ sesję").
3.  Postęp nauki (informacje dla algorytmu SR) jest zapisywany po każdej ocenionej fiszce lub przy przerwaniu sesji.

## 6. Metryki sukcesu
6.1. Akceptacja fiszek generowanych przez AI:
    Cel: 75% fiszek wygenerowanych przez AI jest akceptowanych przez użytkownika (bezpośrednio lub po edycji).
    Mierzenie: Analiza logów systemowych. Stosunek liczby fiszek, które przeszły przez etap "kandydata AI" i zostały zapisane do bazy przez użytkownika, do całkowitej liczby unikalnych "kandydatów na fiszki" zaprezentowanych użytkownikom w danym okresie.

6.2. Wykorzystanie AI do tworzenia fiszek:
    Cel: Użytkownicy tworzą 75% swoich fiszek z wykorzystaniem funkcjonalności AI.
    Mierzenie: Analiza logów systemowych. Stosunek liczby fiszek stworzonych przy udziale AI (tych, które były "kandydatami", nawet jeśli edytowane przed zapisem) do całkowitej liczby nowo utworzonych fiszek (AI + manualne) w danym okresie.

6.3. Dodatkowe wskaźniki do monitorowania (poza głównymi kryteriami sukcesu MVP):
    6.3.1. Liczba aktywnych użytkowników (dziennie/tygodniowo/miesięcznie - DAU/WAU/MAU).
    6.3.2. Retencja użytkowników (np. % użytkowników powracających po 1, 7, 30 dniach).
    6.3.3. Średnia liczba fiszek tworzonych na użytkownika.
    6.3.4. Średnia liczba sesji nauki na aktywnego użytkownika.
    6.3.5. Średni czas spędzony w aplikacji.
```