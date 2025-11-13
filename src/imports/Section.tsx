import img from "figma:asset/a8ac0c13d0943af207e3c60cdf9d14ded6139581.png";

function Component() {
  return (
    <div className="basis-0 grow max-w-[1920px] min-h-px min-w-px relative shrink-0 w-full" data-name="Архитектурный фон">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="Фоновое изображение" className="absolute h-[106.42%] left-0 max-w-none top-[-3.21%] w-full" src={img} />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex flex-col inset-0 items-start justify-center" data-name="Container">
      <Component />
      <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0.7)] inset-0 to-[rgba(0,0,0,0.7)] via-50% via-[rgba(0,0,0,0.6)]" data-name="Gradient" />
    </div>
  );
}

function BackgroundBorderShadowOverlayBlur() {
  return (
    <div className="backdrop-blur-[20px] backdrop-filter box-border content-stretch flex items-start justify-center mb-[-1px] px-[34px] py-[14px] relative rounded-[3.35544e+07px] shrink-0" data-name="Background+Border+Shadow+OverlayBlur">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_0px_40px_0px_rgba(255,255,255,0.2),0px_20px_60px_0px_rgba(0,0,0,0.3)]" />
      <div className="flex flex-col font-['Geometria:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[50px] text-center text-nowrap text-white tracking-[-0.4px]">
        <p className="leading-[50px] whitespace-pre">ЦИФРОВОЙ ПОМОЩНИК</p>
      </div>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start px-[20px] py-[8px] relative rounded-[3.35544e+07px] shadow-[0px_0px_25px_0px_rgba(255,255,255,0.4)] shrink-0" data-name="Background+Shadow">
      <div className="flex flex-col font-['Geometria:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[60px] text-nowrap tracking-[-0.4px]">
        <p className="leading-[75px] whitespace-pre">БЕЗ АГЕНТСТВ</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Geometria:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[60px] text-center text-nowrap text-white tracking-[-0.4px]">
        <p className="leading-[75px] whitespace-pre">И</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-[1337px]" data-name="Container">
      <BackgroundShadow />
      <Container1 />
    </div>
  );
}

function BackgroundShadow1() {
  return (
    <div className="bg-white box-border content-stretch flex items-start justify-center px-[20px] py-[8px] relative rounded-[3.35544e+07px] shadow-[0px_0px_25px_0px_rgba(255,255,255,0.4)] shrink-0" data-name="Background+Shadow">
      <div className="flex flex-col font-['Geometria:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[60px] text-center text-nowrap tracking-[-0.4px]">
        <p className="leading-[75px] whitespace-pre">БЕЗ ДАВЛЕНИЯ</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pl-[412.39px] pr-[163.39px] py-0 relative w-full">
          <BackgroundShadow1 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-end relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[16px] items-center mb-[-1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Geometria:Bold',_sans-serif] justify-center leading-[75px] not-italic relative shrink-0 text-[60px] text-center text-nowrap text-white tracking-[-0.4px] whitespace-pre">
        <p className="mb-0">ПО САМОСТОЯТЕЛЬНОЙ</p>
        <p>ОРГАНИЗАЦИИ ПОХОРОН</p>
      </div>
      <Container4 />
    </div>
  );
}

function Heading() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col items-center size-full">
        <div className="box-border content-stretch flex flex-col items-center pb-px pt-0 px-[16px] relative w-full">
          <BackgroundBorderShadowOverlayBlur />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="box-border content-stretch flex items-center justify-center min-w-[160px] px-[26px] py-[2px] relative rounded-[3.35544e+07px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.6)] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_0px_30px_0px_rgba(255,255,255,0.3),0px_15px_50px_0px_rgba(0,0,0,0.3)]" />
      <div className="flex flex-col font-['Geometria:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[16px] text-center text-nowrap">
        <p className="leading-[24px] whitespace-pre">Начать организацию</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white min-w-[160px] relative rounded-[3.35544e+07px] shrink-0" data-name="Button">
      <div className="box-border content-stretch flex items-center justify-center min-w-inherit overflow-clip pb-[2.5px] pt-[1.5px] px-[25px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Geometria:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[16px] text-center text-nowrap">
          <p className="leading-[24px] whitespace-pre">Посмотреть тарифы</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white min-w-[160px] relative rounded-[3.35544e+07px] shrink-0" data-name="Button">
      <div className="box-border content-stretch flex items-center justify-center min-w-inherit overflow-clip pb-[2.5px] pt-[1.5px] px-[25px] relative rounded-[inherit]">
        <div className="flex flex-col font-['Geometria:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#101828] text-[16px] text-center text-nowrap">
          <p className="leading-[24px] whitespace-pre">Как мы работаем</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

function Container6() {
  return (
    <div className="max-w-[1152px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row justify-center max-w-inherit size-full">
        <div className="box-border content-stretch flex gap-[16px] items-start justify-center max-w-inherit px-[16px] py-0 relative w-full">
          <Button />
          <Button1 />
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[64px] items-start max-w-[1152px] min-w-[1152px] pb-[96px] pt-[16px] px-[16px] relative shrink-0" data-name="Container">
      <Heading />
      <Container6 />
    </div>
  );
}

export default function Section() {
  return (
    <div className="box-border content-stretch flex items-center justify-center px-0 py-[277.5px] relative size-full" data-name="Section">
      <Container />
      <Container7 />
    </div>
  );
}