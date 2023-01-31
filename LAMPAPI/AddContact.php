
<?php

	$inData = getRequestInfo();

	$Images = $inData["Images"];
	$Name = $inData["Name"];
	$Alive = $inData["Alive"];
	$Phone = $inData["Phone"];
	$Email = $inData["Email"];
	$Relation = $inData["Relation"];
	$UserID = $inData["UserID"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (Images,Name,Alive,Phone,Email,Relation,UserID) VALUES(?,?,?,?,?,?,?)");
		$stmt->bind_param("sssssss",$Images, $Name, $Alive, $Phone, $Email, $Relation, $UserID);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
