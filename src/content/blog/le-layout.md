---
author: No1ceTea
pubDatetime: 2024-02-21T10:55:19Z
title: Le layout
slug: "le-layout"
featured: true
tags:
  - Ressource
description: "Une disposition qui change tout."
heroImage: /posts/layoutHero.png
---

Il existe deux manières de décrire la disposition des touches sur un clavier, la disposition **physique** et la disposition **logique**. Ces deux notions se **complètent**.

La **disposition physique** est la façon dont les touches sont disposées les unes par rapport aux autres, quels que soient les lettres/caractères auxquels elles sont associées. Il existe deux dispositions physiques principales, **ANSI** et **ISO** (et **JIS**, qui n'est courant qu'au Japon).

Voici une représentation avec en rouge les différences sur chacune de ces dispositions :

- **ANSI:**
  ![ansiLayout](/posts/ansiLayout.png)

- **ISO:**
  ![isoLayout](/posts/isoLayout.png)

L'ANSI se trouve généralement sur les claviers américains, et l'ISO sur les claviers européens.

Mais la disposition physique est une chose, encore faut-il savoir quelle touche correspond à quel caractère, et c'est pour ça qu'une fois la disposition physique considérée, on doit aborder...

## La disposition logique

La **disposition logique** correspond à la répartition des caractères sur un clavier : c'est là qu'on parle d'azerty, de qwerty, mais ces appellations ont le défaut d'être vagues et d'entretenir une certaine confusion : le qwerty US est différent du qwerty UK et a une touche en moins, l'azerty belge est différent de l'azerty français... Pour éviter cette confusion, il vaut mieux,
donner son appellation complète de sa disposition physique et logique.
Vous pouvez retrouver les différentes variantes sur [wikipedia](http://en.wikipedia.org/wiki/Keyboard_layout#QWERTY-based_layouts_for_Latin_script).

## Langue et OS

Il est à noter que la disposition physique ou logique d'un clavier ne présume en rien des caractères qu'il peut envoyer à un pc : à ce niveau, c'est **la disposition choisie dans l'OS** (dans les options régionales/de langue) qui prime. Autrement dit, vous pouvez tout à fait utiliser ce genre de combinaisons :

- un clavier ANSI en azerty (mais vous perdrez alors la 105e touche, à droite du Shift gauche, le <> sur le clavier français, qu'il vous faudra réassigner de façon logicielle d'une manière ou d'une autre).
- un clavier ISO-FR en qwerty (anglais ou américain, auquel cas vous aurez une touche en "trop").

Les variantes régionales de l'ISO ne régissent que les caractères **imprimés sur les touches** (les légendes), qui sont purement indicatifs : au niveau matériel, un ISO d'une région est similaire à tout autre ISO et envoie toujours les mêmes codes à l'OS, qui les interprétera différemment selon la langue choisie dans l'OS.

## Un cas particulier : l'US International

Il existe une disposition dédiée au format ANSI (104 touches), qui permet de saisir tout ce qui est normalement requis en ISO FR, notamment les caractères accentués : il s'agit de la disposition US International, sélectionnable dans les paramètres de langue du système d'exploitation.

![apostrophe](/posts/apostrophe.png)

Les caractères rouges sur le modèle ci-dessus représentent ce que vous obtenez en combinaison avec la touche Alt droite (AltGr sur azerty), et les caractères rouges sont des touches mortes en combinaison avec la lettre suivante (comme ^ sur les mises en page azerty).

**Note : Cet article n'est qu'une synthèse de [Forum Hardware](https://forum.hardware.fr/hfr/HardwarePeripheriques/Clavier-Souris/unique-claviers-mecaniques-sujet_6902_1.htm).**
