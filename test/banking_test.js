const Banking = artifacts.require("./Banking.sol")

contract("Banking", function(){
    it("Should deposit 10 balance to account", async function(){
        const amount = 10;

        const contract = await Banking.deployed();
        const resultBeforeDeposit = await contract.getMyBalance.call();
        await contract.deposit(amount);
        const resultAfterDeposit = await contract.getMyBalance.call();
        assert.isTrue(resultAfterDeposit - resultBeforeDeposit == amount);
    })

    it("Should return a balance as type object", async function(){
        const contract = await Banking.deployed();
        const balance = await contract.getMyBalance.call();
        assert.isTrue((typeof balance).localeCompare("object") == 0);
    })

    

    it("Should withdraw 10 balance from account", async function(){
        const amount = 10;

        const contract = await Banking.deployed();
        const resultBeforeDeposit = await contract.getMyBalance.call();
        await contract.withdraw(amount);
        const resultAfterDeposit = await contract.getMyBalance.call();
        assert.isTrue(resultAfterDeposit == resultBeforeDeposit - amount);
    })

    it("Should fail to withdraw if balance goes below 0", async function(){
        const amount = 100;
        let err = null;

        const contract = await Banking.deployed();
        await contract.deposit(99);

        try{
            await contract.withdraw(amount);
        } catch (error) {
            err = error;
        }

        assert.ok(err instanceof Error);
    })
})