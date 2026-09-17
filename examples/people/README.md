# example person indexes

reference `soulscrape.person-index.v1` packets built by the public-index
workflow in `skills/soulscrape/references/public-person-index.md`. each
directory carries a `generate.ts` that derives stable source ids and emits the
packet, the generated `person-index.json`, and a short README.

| Index | Live page |
| --- | --- |
| [alan-kay](./alan-kay/) | https://soulscrape.com/ben/alan-kay |
| [amelia-wattenberger](./amelia-wattenberger/) | https://soulscrape.com/ben/amelia-wattenberger |
| [anil-dash](./anil-dash/) | https://soulscrape.com/ben/anil-dash |
| [andrej-karpathy](./andrej-karpathy/) | https://soulscrape.com/ben/andrej-karpathy |
| [bad-bunny](./bad-bunny/) | https://soulscrape.com/ben/bad-bunny |
| [bjork](./bjork/) | https://soulscrape.com/ben/bjork |
| [bret-victor](./bret-victor/) | https://soulscrape.com/ben/bret-victor |
| [brian-eno](./brian-eno/) | https://soulscrape.com/ben/brian-eno |
| [bryan-cantrill](./bryan-cantrill/) | https://soulscrape.com/ben/bryan-cantrill |
| [burial](./burial/) | https://soulscrape.com/ben/burial |
| [caterina-barbieri](./caterina-barbieri/) | https://soulscrape.com/ben/caterina-barbieri |
| [christopher-alexander](./christopher-alexander/) | https://soulscrape.com/ben/christopher-alexander |
| [conor-white-sullivan](./conor-white-sullivan/) | https://soulscrape.com/ben/conor-white-sullivan |
| [cory-doctorow](./cory-doctorow/) | https://soulscrape.com/ben/cory-doctorow |
| [dan-snaith](./dan-snaith/) | https://soulscrape.com/ben/dan-snaith |
| [daniel-lopatin](./daniel-lopatin/) | https://soulscrape.com/ben/daniel-lopatin |
| [david-crawshaw](./david-crawshaw/) | https://soulscrape.com/ben/david-crawshaw |
| [david-heinemeier-hansson](./david-heinemeier-hansson/) | https://soulscrape.com/ben/david-heinemeier-hansson |
| [dax-raad](./dax-raad/) | https://soulscrape.com/ben/dax-raad |
| [dwarkesh-patel](./dwarkesh-patel/) | https://soulscrape.com/ben/dwarkesh-patel |
| [dylan-patel](./dylan-patel/) | https://soulscrape.com/ben/dylan-patel |
| [eugene-tssui](./eugene-tssui/) | https://soulscrape.com/ben/eugene-tssui |
| [geoffrey-huntley](./geoffrey-huntley/) | https://soulscrape.com/ben/geoffrey-huntley |
| [geoffrey-litt](./geoffrey-litt/) | https://soulscrape.com/ben/geoffrey-litt |
| [george-hotz](./george-hotz/) | https://soulscrape.com/ben/george-hotz |
| [greg-brockman](./greg-brockman/) | https://soulscrape.com/ben/greg-brockman |
| [gwern](./gwern/) | https://soulscrape.com/ben/gwern |
| [jane-manchun-wong](./jane-manchun-wong/) | https://soulscrape.com/ben/jane-manchun-wong |
| [johannes-schickling](./johannes-schickling/) | https://soulscrape.com/ben/johannes-schickling |
| [joel-spolsky](./joel-spolsky/) | https://soulscrape.com/ben/joel-spolsky |
| [joscha-bach](./joscha-bach/) | https://soulscrape.com/ben/joscha-bach |
| [linus-lee](./linus-lee/) | https://soulscrape.com/ben/linus-lee |
| [lorenzo-senni](./lorenzo-senni/) | https://soulscrape.com/ben/lorenzo-senni |
| [mario-zechner](./mario-zechner/) | https://soulscrape.com/ben/mario-zechner |
| [matt-levine](./matt-levine/) | https://soulscrape.com/ben/matt-levine |
| [michael-levin](./michael-levin/) | https://soulscrape.com/ben/michael-levin |
| [mitchell-hashimoto](./mitchell-hashimoto/) | https://soulscrape.com/ben/mitchell-hashimoto |
| [patrick-collison](./patrick-collison/) | https://soulscrape.com/ben/patrick-collison |
| [patrick-mckenzie](./patrick-mckenzie/) | https://soulscrape.com/ben/patrick-mckenzie |
| [paul-graham](./paul-graham/) | https://soulscrape.com/ben/paul-graham |
| [peter-steinberger](./peter-steinberger/) | https://soulscrape.com/ben/peter-steinberger |
| [pieter-levels](./pieter-levels/) | https://soulscrape.com/ben/pieter-levels |
| [richard-d-james](./richard-d-james/) | https://soulscrape.com/ben/richard-d-james |
| [riley-walz](./riley-walz/) | https://soulscrape.com/ben/riley-walz |
| [simon-willison](./simon-willison/) | https://soulscrape.com/ben/simon-willison |
| [steph-ango](./steph-ango/) | https://soulscrape.com/ben/steph-ango |
| [stephen-wolfram](./stephen-wolfram/) | https://soulscrape.com/ben/stephen-wolfram |
| [steve-yegge](./steve-yegge/) | https://soulscrape.com/ben/steve-yegge |
| [stewart-brand](./stewart-brand/) | https://soulscrape.com/ben/stewart-brand |
| [terry-davis](./terry-davis/) | https://soulscrape.com/ben/terry-davis |
| [thomas-ptacek](./thomas-ptacek/) | https://soulscrape.com/ben/thomas-ptacek |
| [tim-berners-lee](./tim-berners-lee/) | https://soulscrape.com/ben/tim-berners-lee |
| [tim-hecker](./tim-hecker/) | https://soulscrape.com/ben/tim-hecker |
| [tyler-cowen](./tyler-cowen/) | https://soulscrape.com/ben/tyler-cowen |
| [yacine-brahimi](./yacine-brahimi/) | https://soulscrape.com/ben/yacine-brahimi |

Every packet is public-only research: each claim cites sources, beliefs and
patterns stay separate from facts, and `openQuestions` records what the public
record does not settle. Validate any packet with:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts \
  examples/people/<handle>/person-index.json
```
