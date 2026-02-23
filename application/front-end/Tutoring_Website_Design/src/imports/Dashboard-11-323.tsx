/**
 * Dashboard-11-323.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * This is a Figma-imported design file containing React components for a dashboard layout.
 * The file was auto-generated from a Figma design and preserves the exact visual styling,
 * positioning, and layout from the original design. It includes various Frame components
 * that represent different sections of the dashboard UI. This file serves as a design
 * reference or can be integrated into the main application. The styling uses absolute
 * positioning and specific pixel values to match the Figma design precisely.
 * 
 * Note: This is an imported design file - modifications should preserve the original
 * design intent unless explicitly updating the design.
 */

import imgEllipse30 from "figma:asset/245a7d0f66b2a4c07c6f65541bd8759f79b07f71.png";

function Frame12() {
  return <div className="absolute bg-[#dfdfdf] h-[234.333px] left-0 top-0 w-[610.444px]" />;
}

function Frame10() {
  return (
    <div className="absolute h-[181.739px] left-[210px] rounded-[25px] top-[143px] w-[190px]" style={{ backgroundImage: "linear-gradient(90deg, rgb(223, 223, 223) 0%, rgb(223, 223, 223) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
      <div className="h-[181.739px] overflow-clip relative rounded-[inherit] w-[190px]">
        <div className="absolute h-[181.739px] left-0 top-0 w-[190px]">
          <img alt="" className="block max-w-none size-full" height="181.739" src={imgEllipse30} width="190" />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[2.754px] border-black border-solid inset-0 pointer-events-none rounded-[25px]" />
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute bg-white h-[182px] left-[127px] rounded-[25px] top-[419px] w-[355px]">
      <div className="h-[182px] overflow-clip relative rounded-[inherit] w-[355px]">
        <div className="absolute h-[181.739px] left-0 top-0 w-[190px]">
          <img alt="" className="block max-w-none size-full" height="181.739" src={imgEllipse30} width="190" />
        </div>
        <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-[181.5px] text-[12px] text-black text-center text-nowrap top-[65px] translate-x-[-50%] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal] whitespace-pre">Hi my name is mark 3rd year computer science major.</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[2.754px] border-solid border-white inset-0 pointer-events-none rounded-[25px]" />
    </div>
  );
}

function MessageButton() {
  return (
    <div className="absolute bg-[#0f0f0f] h-[40px] left-[257px] overflow-clip rounded-[24px] top-[617px] w-[96.8px]" data-name="message button">
      <div className="absolute flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-[48.5px] text-[12px] text-center text-nowrap text-white top-[20px] translate-x-[-50%] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Message</p>
      </div>
    </div>
  );
}

function FollowMessage() {
  return (
    <div className="absolute contents left-[257px] top-[617px]" data-name="follow/message">
      <MessageButton />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute bg-[#a2a2a2] h-[703px] left-[127px] overflow-clip top-[146px] w-[610.444px]">
      <Frame12 />
      <Frame10 />
      <Frame13 />
      <div className="absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] left-[calc(50%-0.22px)] text-[18px] text-black text-center text-nowrap top-[351.5px] translate-x-[-50%] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Mark</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] left-[304px] text-[18px] text-black text-center text-nowrap top-[390.5px] translate-x-[-50%] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Computer Science</p>
      </div>
      <div className="absolute flex flex-col font-['Roboto:Medium',sans-serif] font-medium justify-center leading-[0] left-[303.5px] text-[18px] text-black text-center text-nowrap top-[445.5px] translate-x-[-50%] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Bio</p>
      </div>
      <FollowMessage />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute bg-[#f0f0f0] h-[995px] left-0 overflow-clip top-[122px] w-[864px]">
      <Frame9 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="absolute bg-black h-[82.917px] left-0 overflow-clip top-[83px] w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-22px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-12.46px)] whitespace-pre">User</p>
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute bg-black h-[82.917px] left-0 overflow-clip top-[165px] w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-22px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-12.46px)] whitespace-pre">User</p>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute bg-black h-[82.917px] left-0 overflow-clip top-[248px] w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-22px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-12.46px)] whitespace-pre">User</p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="absolute bg-black h-[82.917px] left-0 overflow-clip top-[331px] w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-22px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-12.46px)] whitespace-pre">User</p>
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute bg-black h-[82.917px] left-0 overflow-clip top-[414px] w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-22px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-12.46px)] whitespace-pre">User</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="absolute bg-black h-[82.917px] left-0 overflow-clip top-[497px] w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-22px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-12.46px)] whitespace-pre">User</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="absolute bg-black h-[82.917px] left-0 overflow-clip top-[580px] w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-22px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-12.46px)] whitespace-pre">User</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="absolute bg-black h-[82.917px] left-0 overflow-clip top-[663px] w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-22px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-12.46px)] whitespace-pre">User</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="absolute bg-black h-[82.917px] left-0 overflow-clip top-[746px] w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-22px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-12.46px)] whitespace-pre">User</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="absolute bg-black h-[82.917px] left-0 overflow-clip top-[829px] w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-22px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-12.46px)] whitespace-pre">User</p>
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute bg-black h-[82.917px] left-0 overflow-clip top-[912px] w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-22px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-12.46px)] whitespace-pre">User</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute bg-[#6f6f6f] h-[82.917px] left-0 overflow-clip top-px w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-22px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-12.46px)] whitespace-pre">User</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="absolute bg-white h-[995px] left-0 overflow-clip top-[-1px] w-[216px]">
      <Frame18 />
      <Frame19 />
      <Frame20 />
      <Frame21 />
      <Frame22 />
      <Frame23 />
      <Frame24 />
      <Frame25 />
      <Frame26 />
      <Frame27 />
      <Frame28 />
      <Frame17 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-[#a6a6a6] h-[995px] left-[864px] overflow-clip top-[122px] w-[864px]">
      <Frame16 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute left-[492px] size-[54px] top-[17px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54 54">
        <g id="Group 24">
          <circle cx="27" cy="27" fill="var(--fill-0, black)" id="Ellipse 32" r="27" />
          <path d="M17 34L27 19L37 34" id="Vector 23" stroke="var(--stroke-0, white)" />
        </g>
      </svg>
    </div>
  );
}

function MessageBar() {
  return (
    <div className="absolute h-[88px] left-[31px] top-[889px] w-[581.132px]" data-name="Message Bar">
      <div className="h-[88px] overflow-clip relative rounded-[inherit] w-[581.132px]">
        <p className="absolute font-['Roboto:Light',sans-serif] font-light leading-[normal] left-[33.21px] text-[26.566px] text-black text-nowrap top-[28.23px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Message. . .
        </p>
        <Group1 />
      </div>
      <div aria-hidden="true" className="absolute border-[1.66px] border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame14() {
  return (
    <div className="absolute bg-[#6f6f6f] h-[43px] left-[512px] rounded-bl-[25px] rounded-tl-[25px] rounded-tr-[25px] top-[815px] w-[100px]">
      <p className="absolute font-['Roboto:Light',sans-serif] font-light leading-[normal] left-[calc(50%-18px)] text-[16px] text-nowrap text-white top-[calc(50%-9.5px)] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Hello
      </p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute bg-[#6f6f6f] h-[43px] left-[31px] rounded-br-[25px] rounded-tl-[25px] rounded-tr-[25px] top-[772px] w-[100px]">
      <p className="absolute font-['Roboto:Light',sans-serif] font-light leading-[normal] left-[calc(50%-18px)] text-[16px] text-nowrap text-white top-[calc(50%-9.5px)] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Hello!
      </p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute bg-[#dfdfdf] h-[181.739px] left-1/2 rounded-[25px] top-[calc(50%-324.63px)] translate-x-[-50%] translate-y-[-50%] w-[190px]">
      <div className="h-[181.739px] overflow-clip relative rounded-[inherit] w-[190px]">
        <div className="absolute h-[181.739px] left-0 top-0 w-[190px]">
          <img alt="" className="block max-w-none size-full" height="181.739" src={imgEllipse30} width="190" />
        </div>
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-52px)] not-italic text-[20px] text-black text-nowrap top-[calc(50%-11.87px)] whitespace-pre">Other User</p>
      </div>
      <div aria-hidden="true" className="absolute border-[2.754px] border-black border-solid inset-0 pointer-events-none rounded-[25px]" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute bg-[#eaeaea] h-[995px] left-[1080px] overflow-clip top-[122px] w-[648px]">
      <MessageBar />
      <Frame14 />
      <Frame15 />
      <Frame11 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-0 top-[122px]">
      <Frame6 />
      <Frame7 />
      <Frame8 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-[#c4c4c4] h-[123px] left-[432px] overflow-clip top-0 w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-35px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-11.5px)] whitespace-pre">Sign out</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-[#6f6f6f] h-[123px] left-[216px] overflow-clip top-0 w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-52px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-11.5px)] whitespace-pre">Dashboard</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-[#c4c4c4] h-[123px] left-0 overflow-clip top-0 w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-27px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-11.5px)] whitespace-pre">Apply</p>
    </div>
  );
}

function Frame30() {
  return <div className="absolute bg-[#878383] h-[38px] left-[144px] top-0 w-[40px]" />;
}

function Frame29() {
  return (
    <div className="absolute bg-white h-[38px] left-[16px] overflow-clip top-[42px] w-[184px]">
      <Frame30 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#c4c4c4] h-[123px] left-[650px] overflow-clip top-[-3px] w-[216px]">
      <Frame29 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-88px)] not-italic text-[#585454] text-[20px] top-[calc(50%-11.5px)] w-[190px]">Search</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-[#787878] h-[123px] left-[864px] overflow-clip top-0 w-[864px]">
      <Frame4 />
      <Frame2 />
      <Frame3 />
      <Frame1 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute bg-black h-[123px] left-0 overflow-clip top-0 w-[1728px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[31px] not-italic text-[36px] text-nowrap text-white top-[calc(50%-21.5px)] whitespace-pre">LEMN SFSU</p>
      <Frame />
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-white relative size-full" data-name="Dashboard">
      <Group />
      <Frame5 />
    </div>
  );
}