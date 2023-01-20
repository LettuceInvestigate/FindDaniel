
<?php

	$inData = getRequestInfo();

	$userId = $inData["userId"];
	$Name = $inData["Name"];
	$Phone = $inData["Phone"];
	$Email = $inData["Email"];
	$Alive = $inData["Alive"];
	$Relationship = $inData["Relationship"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT into Contacts (Name,Phone,Email,Alive,Relationship,UserID) VALUES(?,?,?,?,?,?)");
		$stmt->bind_param("ssssss", $Name, $Phone, $Email, $Alive, $Relationship, $userId);
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
