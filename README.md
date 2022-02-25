# tournament-kata-starter

Le gestionnaire de tournoi est une API qui permet aux organisateurs de créer, suivre et administrer un tournoi tout au long de son déroulement. 

__Attention__ : Le document suivant décrit le comportement de l'application en général, et non le comportement qui sera implémenté étape par étape.

# Documentation fonctionnelle

## Vie d'un tournoi

Un `tournoi` se déroule globalement en trois étapes :
* __Configuration et inscription__ : durant cette étape, l'organisateur déclare son `tournoi`, ajoute des `phases` dans le tournoi, et déclare les `participants`.
* __Lancement du tournoi__ : le lancement du tournoi clôture à la fois les inscriptions au tournoi et la configuration des phases du tournoi. Une fois le tournoi démarré, 
il n'est plus possible de modifier ses informations. La première `phase` s'initialise alors, et les `matches` peuvent commencer.
* __Gestion du tournoi__ : le tournoi se déroule `phase` par `phase`. Chaque `phase` peut-être décomposée en `rounds`, chaque `round` contenant un certain nombre de `matches`. 
L'organisateur remplit les `scores` des matches au fur et à mesure. Une fois tous les matches d'une phase terminée, la `phase` se termine, et la `phase` suivante démarre.
Quand la dernière `phase` est terminée, le tournoi est terminé.

## Participants

Un `participant` est une entité qui va prendre part au tournoi. Un `participant` est identifié par son nom et son `ELO`. L'`ELO` est une valeur numérique arbitraire représentant
le niveau des participants les uns par rapport aux autres. Plus l'`ELO` d'un participant est élevé, plus le participant est considéré comme fort.

Un `participant` peut être une `équipe`, composée de joueu.r.se.s, ou seulement un.e joueu.r.se. 

## Phase 

La `phase` d'un tournoi est un mode opératoire qui permet de déterminer la séquence de matches qui va se dérouler. Un tournoi peut se dérouler en plusieurs phases
qui s'enchainent, auquel cas il faut pouvoir déterminer les participants qualifiés d'une phase sur l'autre.

On peut par exemple imaginer une phase de championnat qui précède une phase de tableau à élimination simple (playoffs)

Vous trouverez ci-dessous quelques exemples de phases :

### Le tableau à élimination simple (`single bracket elimination`) 
Dans cette phase, les participants sont placés en élimination directe, jusqu'à ce qu'il ne reste qu'un gagnant.
C'est le cas par exemple dans les tournois de tennis.

### Le championnat (`championship`)
Dans cette phase, les participants jouent obligatoirement contre chaque autre participant un certain nombre de fois. 
C'est le cas par exemple d'un championnat (dans lequel les participants jouent généralement deux fois chacun). 

### Les poules (`pool`)
Dans cette phase, les participants sont répartis dans des groupes de taille plus ou moins égale, généralement petit (entre 3 et 5), 
et jouent contre l'ensemble des participants de leurs poules.