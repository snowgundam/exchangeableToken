pragma solidity ^0.4.17;


interface ExchangeableERC721Interface {
  event TickerFilled(string tickerType, uint256 tickerId);
  event Logging(string msg);
  event TickerAccecpted(string kind, uint256 tickerId);

  function checkAskTicker(uint256 _id) public view returns (address _addr,uint256 _price,uint256 _amount);
  function matchAsk(uint256 _price, uint256 _start) public view returns (uint256);
  function ask(uint256 _price, uint256 _tokenId) public returns (uint256);
  function fillAsk(uint256 _id, uint256 _price, uint256 _tokenId) public payable returns (uint256);
  function cancelAsk(uint256 _id) public returns (bool);
}
