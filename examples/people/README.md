# Example person indexes

Reference `soulscrape.person-index.v1` packets built by the public-index
workflow in `skills/soulscrape/references/public-person-index.md`. Each
directory carries a `generate.ts` that derives stable source ids and emits the
packet, the generated `person-index.json`, and a short README.

| Index | Live page |
| --- | --- |
| [alan-kay](./alan-kay/) | https://soulscrape.com/ben/alan-kay |
| [amelia-wattenberger](./amelia-wattenberger/) | https://soulscrape.com/ben/amelia-wattenberger |
| [bryan-cantrill](./bryan-cantrill/) | https://soulscrape.com/ben/bryan-cantrill |
| [christopher-alexander](./christopher-alexander/) | https://soulscrape.com/ben/christopher-alexander |
| [conor-white-sullivan](./conor-white-sullivan/) | https://soulscrape.com/ben/conor-white-sullivan |
| [david-crawshaw](./david-crawshaw/) | https://soulscrape.com/ben/david-crawshaw |
| [david-heinemeier-hansson](./david-heinemeier-hansson/) | https://soulscrape.com/ben/david-heinemeier-hansson |
| [dax-raad](./dax-raad/) | https://soulscrape.com/ben/dax-raad |
| [dwarkesh-patel](./dwarkesh-patel/) | https://soulscrape.com/ben/dwarkesh-patel |
| [dylan-patel](./dylan-patel/) | https://soulscrape.com/ben/dylan-patel |
| [eugene-tssui](./eugene-tssui/) | https://soulscrape.com/ben/eugene-tssui |
| [geoffrey-huntley](./geoffrey-huntley/) | https://soulscrape.com/ben/geoffrey-huntley |
| [geoffrey-litt](./geoffrey-litt/) | https://soulscrape.com/ben/geoffrey-litt |
| [greg-brockman](./greg-brockman/) | https://soulscrape.com/ben/greg-brockman |
| [johannes-schickling](./johannes-schickling/) | https://soulscrape.com/ben/johannes-schickling |
| [joel-spolsky](./joel-spolsky/) | https://soulscrape.com/ben/joel-spolsky |
| [joscha-bach](./joscha-bach/) | https://soulscrape.com/ben/joscha-bach |
| [linus-lee](./linus-lee/) | https://soulscrape.com/ben/linus-lee |
| [mario-zechner](./mario-zechner/) | https://soulscrape.com/ben/mario-zechner |
| [michael-levin](./michael-levin/) | https://soulscrape.com/ben/michael-levin |
| [mitchell-hashimoto](./mitchell-hashimoto/) | https://soulscrape.com/ben/mitchell-hashimoto |
| [patrick-collison](./patrick-collison/) | https://soulscrape.com/ben/patrick-collison |
| [peter-steinberger](./peter-steinberger/) | https://soulscrape.com/ben/peter-steinberger |
| [steph-ango](./steph-ango/) | https://soulscrape.com/ben/steph-ango |
| [stephen-wolfram](./stephen-wolfram/) | https://soulscrape.com/ben/stephen-wolfram |
| [steve-yegge](./steve-yegge/) | https://soulscrape.com/ben/steve-yegge |
| [stewart-brand](./stewart-brand/) | https://soulscrape.com/ben/stewart-brand |
| [terry-davis](./terry-davis/) | https://soulscrape.com/ben/terry-davis |
| [thomas-ptacek](./thomas-ptacek/) | https://soulscrape.com/ben/thomas-ptacek |
| [tim-berners-lee](./tim-berners-lee/) | https://soulscrape.com/ben/tim-berners-lee |
| [yacine-brahimi](./yacine-brahimi/) | https://soulscrape.com/ben/yacine-brahimi |

Every packet is public-only research: each claim cites sources, beliefs and
patterns stay separate from facts, and `openQuestions` records what the public
record does not settle. Validate any packet with:

```sh
bun skills/soulscrape/scripts/validate-person-index.ts \
  examples/people/<handle>/person-index.json
```
