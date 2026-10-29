/* Dados dos produtos. Quando o back estiver pronto, troque este array por uma chamada à API. */
const PRODUTOS = [
{id:1,n:"Kit resistores 1/4W (600 pçs)",c:"Passivos",t:"res",p:34.9,s:42,sp:{"Tolerância":"1%","Valores":"30 tipos"}},
{id:2,n:"Capacitor eletrolítico 470µF",c:"Passivos",t:"cap",p:1.8,s:380,sp:{"Tensão":"25V","Tipo":"Radial"}},
{id:3,n:"Capacitor cerâmico 100nF",c:"Passivos",t:"cer",p:0.35,s:2400,sp:{"Tensão":"50V","Pacote":"Disco"}},
{id:4,n:"LED difuso 5mm vermelho",c:"Semicondutores",t:"led",p:0.4,s:1500,sp:{"Corrente":"20mA","Tensão":"2,0V"}},
{id:5,n:"Transistor BC548 NPN",c:"Semicondutores",t:"to92",p:0.7,s:900,sp:{"Corrente":"100mA","Pacote":"TO-92"}},
{id:6,n:"Regulador de tensão LM7805",c:"Semicondutores",t:"reg",p:2.9,s:210,sp:{"Saída":"5V","Corrente":"1A"}},
{id:7,n:"Microcontrolador ATmega328P",c:"Circuitos integrados",t:"ic",p:24.5,s:64,sp:{"Flash":"32KB","Pacote":"DIP-28"}},
{id:8,n:"Timer NE555",c:"Circuitos integrados",t:"ic",p:2.2,s:7,sp:{"Pacote":"DIP-8","Tensão":"4,5–16V"}},
{id:9,n:"Módulo ESP32 DevKit V1",c:"Módulos",t:"mod",p:49.9,s:35,sp:{"Conexão":"Wi‑Fi + BT","GPIOs":"30"}},
{id:10,n:"Sensor de temperatura DHT22",c:"Módulos",t:"sen",p:28.0,s:58,sp:{"Faixa":"-40 a 80°C","Interface":"1‑wire"}},
{id:11,n:"Protoboard 830 pontos",c:"Ferramentas",t:"pb",p:19.9,s:120,sp:{"Pontos":"830","Cor":"Branca"}},
{id:12,n:"Multímetro digital",c:"Ferramentas",t:"mm",p:89.9,s:0,sp:{"Display":"3½ dígitos","CAT":"II 600V"}}
];
