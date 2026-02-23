/**
 * TutorApplicationForm.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * This is a Figma-imported design file for the tutor application form interface. Auto-generated
 * from Figma, it contains the visual layout for the form where students can apply to become
 * tutors on the LEMN platform. The design includes input fields for subject and course selection,
 * along with styling for form controls and submit buttons. This file uses precise positioning
 * and Tailwind classes to match the original Figma design. It serves as a design reference
 * for implementing the actual tutor application functionality.
 * 
 * Note: This is an imported design file - any modifications should maintain visual consistency
 * with the original design unless intentionally updating it.
 */

function Frame5() {
  return (
    <div className="absolute inset-[41.35%_40.51%_53.62%_40.57%]">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute capitalize flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-[7.34%] right-[80.43%] text-[12px] text-[rgba(0,0,0,0.5)] text-nowrap top-1/2 translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal] whitespace-pre">Subject</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute inset-[47.38%_40.51%_47.59%_40.57%]">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute capitalize flex flex-col font-['Roboto:Regular',sans-serif] font-normal justify-center leading-[0] left-[7.34%] right-[81.04%] text-[12px] text-[rgba(0,0,0,0.5)] text-nowrap top-1/2 translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
          <p className="leading-[normal] whitespace-pre">Course</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute bg-black inset-[53.72%_40.51%_41.25%_40.57%] overflow-clip">
      <div className="absolute flex flex-col font-['Roboto:Bold',sans-serif] font-bold justify-center leading-[0] left-1/2 text-[12px] text-center text-nowrap text-white top-1/2 tracking-[0.6px] translate-x-[-50%] translate-y-[-50%]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="leading-[normal] whitespace-pre">Apply</p>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[41.35%_40.51%_41.25%_40.57%]">
      <Frame5 />
      <Frame6 />
      <Frame7 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute bg-white h-[994px] left-0 overflow-clip top-[123px] w-[1728px]">
      <Group />
      <div className="absolute flex flex-col font-['Comfortaa:Bold',sans-serif] font-bold h-[144px] justify-center leading-[0] left-[906px] text-[48px] text-black text-center top-[296px] translate-x-[-50%] translate-y-[-50%] w-[1042px]">
        <p className="leading-[normal]">Tutor Application Form</p>
      </div>
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

function Frame11() {
  return <div className="absolute bg-[#878383] h-[38px] left-[144px] top-0 w-[40px]" />;
}

function Frame10() {
  return (
    <div className="absolute bg-white h-[38px] left-[16px] overflow-clip top-[42px] w-[184px]">
      <Frame11 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#c4c4c4] h-[123px] left-[650px] overflow-clip top-[-3px] w-[216px]">
      <Frame10 />
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

function Frame9() {
  return (
    <div className="absolute bg-black h-[123px] left-px overflow-clip top-0 w-[1728px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[31px] not-italic text-[36px] text-nowrap text-white top-[calc(50%-21.5px)] whitespace-pre">LEMN SFSU</p>
      <Frame />
    </div>
  );
}

export default function TutorApplicationForm() {
  return (
    <div className="bg-white relative size-full" data-name="Tutor Application Form">
      <Frame8 />
      <Frame9 />
    </div>
  );
}