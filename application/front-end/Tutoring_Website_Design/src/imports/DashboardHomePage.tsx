/**
 * DashboardHomePage.tsx
 * 
 * Course: CSC 648 Fall 2025
 * Team: Team06
 * 
 * Description:
 * This is a Figma-imported design file for the home page view of the LEMN dashboard.
 * Auto-generated from Figma, it represents the initial landing screen users see after
 * logging in. The file contains Frame components for the navigation bar with Apply,
 * Dashboard, Search, and Sign out options. This design file uses absolute positioning
 * to maintain pixel-perfect alignment with the original Figma mockup. It serves as a
 * design reference for implementing the dashboard home page functionality.
 * 
 * Note: This is an imported design file - modifications should preserve design integrity.
 */

function Frame5() {
  return (
    <div className="absolute bg-[#c4c4c4] h-[123px] left-[432px] overflow-clip top-0 w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-35px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-11.5px)] whitespace-pre">Sign out</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute bg-[#6f6f6f] h-[123px] left-[216px] overflow-clip top-0 w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-52px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-11.5px)] whitespace-pre">Dashboard</p>
    </div>
  );
}

function Frame4() {
  return (
    <div className="absolute bg-[#c4c4c4] h-[123px] left-0 overflow-clip top-0 w-[216px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-27px)] not-italic text-[20px] text-nowrap text-white top-[calc(50%-11.5px)] whitespace-pre">Apply</p>
    </div>
  );
}

function Frame7() {
  return <div className="absolute bg-[#878383] h-[38px] left-[144px] top-0 w-[40px]" />;
}

function Frame6() {
  return (
    <div className="absolute bg-white h-[38px] left-[16px] overflow-clip top-[42px] w-[184px]">
      <Frame7 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute bg-[#c4c4c4] h-[123px] left-[650px] overflow-clip top-[-3px] w-[216px]">
      <Frame6 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-88px)] not-italic text-[#585454] text-[20px] top-[calc(50%-11.5px)] w-[190px]">Search</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute bg-[#787878] h-[123px] left-[864px] overflow-clip top-0 w-[864px]">
      <Frame5 />
      <Frame3 />
      <Frame4 />
      <Frame2 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute bg-black h-[123px] left-0 overflow-clip top-[-1px] w-[1728px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[31px] not-italic text-[36px] text-nowrap text-white top-[calc(50%-21.5px)] whitespace-pre">LEMN SFSU</p>
      <Frame1 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute bg-gradient-to-r from-[#d0c8c8] h-[343px] left-[66px] overflow-clip to-[#d0c8c8] top-[216px] w-[1595px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[72px] leading-[normal] left-[830px] not-italic text-[32px] text-black text-center top-[131px] translate-x-[-50%] w-[1264px]">List of Tutors available</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute bg-gradient-to-r from-[#d0c8c8] h-[343px] left-[66px] overflow-clip to-[#d0c8c8] top-[636px] w-[1595px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[72px] leading-[normal] left-[827px] not-italic text-[32px] text-black text-center top-[141px] translate-x-[-50%] w-[1264px]">List of Courses available</p>
    </div>
  );
}

export default function DashboardHomePage() {
  return (
    <div className="bg-white relative size-full" data-name="Dashboard: Home page">
      <Frame />
      <Frame8 />
      <Frame9 />
    </div>
  );
}