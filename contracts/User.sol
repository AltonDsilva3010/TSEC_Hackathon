// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract UserRegistration is ERC721URIStorage {
    struct User {
        string name;
        string email;
        string phone;
        string addressuser;
        uint256 pincode;
        string role;
        bool isRegistered;
    }

    struct Admin {
        address metamask_address;
        string role;
    }

    mapping(address => User) public users;
    mapping(address => Admin) public admin;

    event UserRegistered(
        address indexed userAddress,
        string name,
        string email,
        string phone,
        string addressuser,
        uint256 pincode
    );
    event Minted(address indexed to, uint256 indexed tokenId, string uri);

    modifier notRegistered() {
        require(!users[msg.sender].isRegistered, "User is already registered");
        _;
    }

     uint256 tokenId ;
    constructor() ERC721("PropertyItem", "PI") {
        tokenId = 0;
    }

    function mint(
        address _to,
        string calldata _uri
    ) external { //returns (uint256)
        tokenId = tokenId + 1;
        _mint(_to, tokenId);
        _setTokenURI(tokenId, _uri);
        // return tokenId;

        emit Minted(_to, tokenId, _uri);
    }

    function registerUser(
        string memory _name,
        string memory _email,
        string memory _phone,
        string memory _addressuser,
        uint256 _pincode
    ) external notRegistered {
        // Perform additional validation if needed

        // Create a new user
        User storage newUser = users[msg.sender];
        newUser.name = _name;
        newUser.email = _email;
        newUser.phone = _phone;
        newUser.addressuser = _addressuser;
        newUser.pincode = _pincode;
        newUser.role = "user";
        newUser.isRegistered = true;

        emit UserRegistered(
            msg.sender,
            _name,
            _email,
            _phone,
            _addressuser,
            _pincode
        );
    }

    function registerAdmin(address _addressuser) external notRegistered {
        // Perform additional validation if needed

        // Create a new user
        Admin storage newAdmin = admin[_addressuser];
        newAdmin.role = "admin";
    }

    function getUserDetails(
        address useraddr
    )
        external
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        User storage user = users[useraddr];
        require(user.isRegistered, "User is not registered");

        return (
            user.name,
            user.email,
            user.phone,
            user.addressuser,
            user.pincode
        );
    }

    function getUserBoolean(address useraddr) external view returns (bool) {
        return users[useraddr].isRegistered;
    }

    function getUserRole(
        address useraddr
    ) external view returns (string memory) {
        return users[useraddr].role;
    }
}
