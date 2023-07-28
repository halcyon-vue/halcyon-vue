---
title: Top app bar preview
layout: false
search: false
---

<script setup>
import { ref } from 'vue'
import Preview from '../Preview.vue'
import { HTopAppBar, HSwitch, HIconButton, HMenu, HMenuButton } from '../../src/'
import ArrowLeft from '~icons/mdi/arrow-left'
import Paperclip from '~icons/mdi/paperclip'
import Calendar from '~icons/mdi/calendar'
import DotsVertical from '~icons/mdi/dots-vertical'
import HelpCircleOutline from '~icons/mdi/help-circle-outline'
import BugOutline from '~icons/mdi/bug-outline'

const kind = ref('center')

const hideOnScroll = ref(false)

const back = () => history.back()
</script>

<style scoped>
#app > div > div {
  font-family: "Roboto Flex", "Roboto", Roboto, "Noto Sans", system-ui,
    "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji";

  background-color: var(--halcyon-surface);
  color: var(--halcyon-on-surface);
}
    h1, h2, p, li {
        margin: 0 1rem;
    }
    h1 {
        margin-top: 1.5rem;
        font-size: 22px;
    line-height: 28px;
    font-weight: 500;
    }
    h2 {
        margin-top: 1rem;
        font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.15;
    font-weight: 500;
    }
    p {
        margin-top: 0.5rem;
        max-width: 70ch;
        font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5;
    }
blockquote {
    margin-left: 3rem;
    
}

img {
    border-radius: 100%;
}

li {
    margin-left: 2rem;
    list-style-type: disc;
}
</style>
<h-top-app-bar :kind="kind" title="Top app bar preview" :hide-on-scroll="hideOnScroll">
    <template #navigation-icon>
        <h-icon-button @click="back()" label="Return">
            <ArrowLeft />
        </h-icon-button>
    </template>
    <template #trailing v-if="true">
        <h-icon-button @click="back()" label="Return">
            <Calendar />
        </h-icon-button>
        <h-icon-button @click="back()" label="Return">
            <Paperclip />
        </h-icon-button>
        <h-menu>
            <template #button>
                <h-icon-button label="Open menu">
                    <DotsVertical />
                </h-icon-button>
            </template>
            <template #content>
                <h-menu-button label="Help center">
                    <template #trailing>
                        <HelpCircleOutline />
                    </template>
                </h-menu-button>
                <h-menu-button label="File a bug">
                    <template #trailing>
                        <BugOutline />
                    </template>
                </h-menu-button>
            </template>
        </h-menu>
    </template>
    <template #trailing v-else>
        <img width="30" height="30" src="../images/sucrose.png">
    </template>
</h-top-app-bar>
<select v-model="kind">
    <option value="center">Center-aligned</option>
    <option value="small">Small</option>
    <option value="medium">Medium</option>
    <option value="large">Large</option>
    <option value="compressing">Compressing</option>
</select>
<input type="checkbox" v-model="hideOnScroll"> Hide on scroll

Following filler text is from the article "[Alcyone and Ceyx][article]", available on
[Wikipedia, the free encyclopedia][wp].

[article]: https://en.wikipedia.org/wiki/Alcyone_and_Ceyx
[wp]: https://wikipedia.org

# Alcyone and Ceyx

In Greek mythology, Alcyone or Halcyone[1] (/ælˈsaɪəˌni, hælˈsaɪəˌni/; Ancient Greek: Ἀλκυόνη, romanized: Alkyónē derived from ἀλκυών, alkyṓn, 'kingfisher') and Ceyx (/ˈsiːɪks/; Ancient Greek: Κήϋξ, romanized: Kḗÿx) were a wife and husband who incurred the wrath of the god Zeus. 

## Mythology

Alcyone was a Thessalian princess, the daughter of King Aeolus of Aeolia, either by Enarete or Aegiale. She was the sister of Salmoneus, Athamas, Sisyphus, Cretheus, Perieres, Deioneus, Magnes, Calyce, Canace, Pisidice and Perimede.

Later on, Alcyone became the queen of Trachis after marrying King Ceyx. The latter was the son of Eosphorus (often translated as Lucifer). The couple were very happy together in Trachis.

According to Pseudo-Apollodorus's account, this couple often sacrilegiously called each other "Zeus" and "Hera". This angered Zeus, so while Ceyx was at sea (in order to consult an oracle, according to Ovid), he killed Ceyx with a thunderbolt. Soon after, Morpheus, the god of dreams, disguised as Ceyx, appeared to Alcyone to tell her of her husband's fate. In her grief she threw herself into the sea. Out of compassion, the gods changed them both into "halcyon birds" (common kingfishers), named after her. Apollodorus says that Ceyx was turned into a gannet, and not a kingfisher.

Ovid and Hyginus both also recount the metamorphosis of the pair in and after Ceyx's loss in a terrible storm, though they both omit Ceyx and Alcyone calling each other "Zeus" and "Hera" (and Zeus's resulting anger) as a reason for it. On the contrary, it is mentioned that while still unaware of Ceyx's death in the shipwreck, Alcyone continued to pray at the altar of Hera for his safe return.[7] Ovid also adds the detail of her seeing his body washed ashore before her attempted suicide. Pseudo-Probus, a scholiast on Virgil's Georgics, notes that Ovid followed Nicander's version of the tale, instead of Theodorus's starring another Alcyone.

Virgil in the Georgics also alludes to the myth - again without reference to Zeus's anger.[9]

It is possible that the earlier myth was a simpler version of the one by Nicander, where a woman named Alcyone mourned her unnamed husband; Ceyx was probably added later due to him being an important figure in mythology and poetry, and also having a wife whose name was Alcyone (as evidenced from the Hesiodic poem Wedding of Ceyx).

## Halcyon days

Ovid and Hyginus both also make the metamorphosis the origin of the term "halcyon days", the seven days in winter when storms never occur. They state that these were originally the 14 days each year (seven days on either side of the shortest day of the year[11]) during which Alcyone (as a kingfisher) laid her eggs and made her nest on the beach and during which her father Aeolus, god of the winds, restrained the winds and calmed the waves so she could do so in safety. Aeolus controls the wind and the bird couple can nurture their young nestlings.[7] The phrase has since come to refer to any peaceful time. Its proper meaning, however, is that of a lucky break, or a bright interval set in the midst of adversity; just as the days of calm and mild weather are set in the height of winter for the sake of the kingfishers' egglaying according to the myth. Kingfishers however do not live by the sea, so Ovid's tale is not based on any actual observations of the species and in fact refers to a mythical bird only later identified with the kingfisher. 

## Interpretation

The English poet Robert Graves, in his The Greek Myths, explained the origin of Alcyone's myth as follows:

> The legend of the halcyon’s, or kingfisher’s, nest (which has no foundation in natural history, since the halcyon does not build any kind of nest, but lays eggs in holes by the waterside) can refer only to the birth of the new sacred king at the winter solstice—after the queen who represents his mother, the Moon-goddess, has conveyed the old king’s corpse to a sepulchral island. But because the winter solstice does not always coincide with the same phase of the moon, ‘every year’ must be understood as ‘every Great Year’, of one hundred lunations, in the last of which solar and lunar time were roughly synchronized, and the sacred king’s term ended.

> Homer connects the halcyon with Alcyone, a title of Meleager’s wife Cleopatra (Iliad), and with a daughter of Aeolus, guardian of the winds. Halcyon cannot therefore mean halcyon, ‘sea-hound’, as is usually supposed, but must stand for alcy-one, ‘the queen who wards off evil’. This derivation is confirmed by the myth of Alcyone and Ceyx, and the manner of their punishment by Zeus and Hera. The seamew part of the legend need not be pressed, although this bird, which has a plaintive cry, was sacred to the Sea-goddess Aphrodite, or Leucothea, like the halcyon of Cyprus. It seems that late in the second millennium BC the sea-faring Aeolians, who had agreed to worship the pre-Hellenic Moon-goddess as their divine ancestress and protectress, became tributary to the Zeus-worshiping Achaeans, and were forced to accept the Olympian religion. ‘Zeus’, which according to Johannes Tzetzes, had hitherto been a title born by petty kings, was henceforth reserved for the Father of Heaven alone. But in Crete, the ancient mystical tradition that Zeus was born and died annually lingered on into Christian times, and tombs of Zeus were shown at Cnossus, on Mount Ida, and on Mount Dicte, each a different cult-centre. Callimachus was scandalized, and in his Hymn to Zeus wrote: ‘The Cretans are always liars. They have even built thy tomb, O Lord! But thou art not dead, for thou livest for ever.’ This is quoted in Titus.

> Pliny, who describes the halcyon’s alleged nest in detail—apparently the zoophyte called halcyoneum by Linnaeus—reports that the halcyon is rarely seen, and then only at the two solstices and at the setting of the Pleiades. This proves her to have originally been a manifestation of the Moon-goddess, who was alternately the Goddess of Life-in-Death at the winter solstice, and of Death-in-Life at the summer solstice; and who, every Great Year, early in November, when the Pleiades set, sent the sacred king his death summons.

> Still another Alcyone, daughter of Pleione (‘sailing queen’) by Atlas, was the leader of the seven Pleiades. The Pleiades’ heliacal rising in May began the navigational year; their setting marked its end, when (as Pliny notes in a passage about the halcyon) a remarkably cold north wind blows. The circumstances of Ceyx’s death show that the Aeolians, who were famous sailors, worshipped the goddess as 'Alcyone' because she protected them from rocks and rough weather: Zeus wrecked Ceyx’s ship, in defiance of her powers, by hurling a thunderbolt at it. Yet the halcyon was still credited with the magical power of allaying storms; and its body, when dried, was used as a talisman against Zeus’s lightning—presumably on the ground that where once it strikes it will not strike again. The Mediterranean is inclined to be calm about the time of the winter solstice.[12]

Although one of the mythological Pleiades was indeed called Alcyone, Graves does not cite any sources to support his claim that she was their leader - or even to support the idea that they had a leader. This claim is also made in Graves's The White Goddess, but again no quotations from myths or scholiasts are given to support it. 

## Legacy

- Various kinds of kingfishers are named after the couple, in reference to the metamorphosis myth:
  - The genus Ceyx (within the river kingfishers family) is named after him
  - The kingfisher family Halcyonidae (tree kingfishers) is named after Alcyone, as is the genus Halcyon.
  - The belted kingfisher's Latin species name (Megaceryle alcyon) also references her name.
- Their story features in The Book of the Duchess.
- Their story is the basis for the opera Alcyone by the French composer Marin Marais and the cantata Alcyone by Maurice Ravel
- A collection of Canada's celebrated nature poet, Archibald Lampman, Alcyone, his final set of poetry published posthumously in 1899, highlights both Lampman's apocalyptic and utopian visions of the future.
- TS Eliot draws from this myth in The Dry Salvages: "And the ragged rock in the restless waters,/Waves wash over it, fogs conceal it;/On a halcyon day it is merely a monument,/In navigable weather it is always a seamark/To lay a course by: but in the sombre season/Or the sudden fury, is what it always was."